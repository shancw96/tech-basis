import asyncio
from typing import Optional, Union, List
from pydantic import BaseModel

from langchain.chat_models import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import chromadb
from chromadb.config import Settings
from langchain.chains.summarize import load_summarize_chain
from langchain import LLMChain
from typing import Any, Dict, List
from pydantic import BaseModel, validator
from prompts import QA_PROMPT
from langchain.callbacks.base import BaseCallbackHandler, AsyncCallbackHandler
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
import queue
import sys
from langchain.schema import (
    AgentAction,
    AgentFinish,
    BaseMessage,
    LLMResult,
)

from webbrowser import Chrome
from langchain.document_loaders import DirectoryLoader

from AI.fastapi.utils import is_chroma_collection_exist
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma


class ChatMessage(BaseModel):
    chat_history: List[str]
    prompt: str
    chat_id: Optional[Union[str, None]] = None


# async def chat_response_stream(prompt, chatllm, chat_id="chat_9527"):

#   db = get_or_create_chatgroup_vector_db(chat_id, "store")

#   print("正在读取与提问相关联的记忆...")
#   docs = db.similarity_search(query=prompt, k=4)
#   # refine question
#   chain = load_summarize_chain(summaryllm, chain_type="stuff")
#   summary = chain.run(docs)
#   print("总结上下文如下：", summary)

#   custom_qa_chain = LLMChain(llm=chatllm, prompt=QA_PROMPT, verbose=True)
#   print("正在调用openai发起提问...")
#   res = custom_qa_chain.predict(context = summary, question = prompt)

#   print("正在添加聊天记录至记忆库...", ["Human: " + prompt, "Assistant: " + res])
#   db.add_texts(["Human" + prompt, "Assistant: " + res])
#   db.persist()

#   return res

# 判断是否存在该聊天分组的矢量数据库，不存在就新建一个
def get_or_create_chatgroup_vector_db(chat_id, embedding, persist_dir="store"):
    if not is_chroma_collection_exist(chat_id, persist_dir):
        print("正在使用历史聊天记录为当前聊天分组构建矢量数据库...")
        # TODO: retrive chat history from db
        chat_history = [ "System: You are a assistant, you will answer Human questions, use the following pieces of context to answer the question . Try to give some answer Human may like." ]
        vectordb = Chroma.from_texts(
            persist_directory=persist_dir, texts=chat_history, embedding=embedding, collection_name=chat_id)
        vectordb.persist()
        vectordb = None

    return Chroma(persist_directory=persist_dir, embedding_function=embedding, collection_name=chat_id)

def is_chroma_collection_exist(collection_name, persist_dir="store"):
    try:
        client = chromadb.Client(Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory=persist_dir
        ))
        client.get_collection(collection_name)
        return True
    except Exception as e:
        return False
    
def get_or_init_docs_collection(collection_name, docs_source_path, embedding, persist_dir):
  try:
    if not is_chroma_collection_exist():
      loader = DirectoryLoader(docs_source_path, glob = "**/*.md")
      docs = loader.load()
      print (f'You have {len(docs)} document(s) in your data')
      text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
      split_docs = text_splitter.split_documents(docs)
      vectorstore = Chroma.from_documents(split_docs, embedding, persist_directory=persist_dir)
      vectorstore.persist()
      print (f'已为当前文档集生成矢量数据')
      vectorstore = None

    return Chrome(persist_directory=persist_dir, embedding_function=embedding, collection_name=collection_name)
  except Exception as e:
    print("####文档矢量数据库加载失败####")
    print(e)


class HistoryLoggerAsyncHandler(AsyncCallbackHandler):

    def __init__(self, callbacks: List = []):
        self.logger = []
        self.callbacks = callbacks

    async def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> None:
        
        self.logger.append(prompts[0])

    async def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        # TODO: store current QA txt to db
        self.logger.append(f'Assistant : {response.generations[0][0].text}')
        # fire all callbacks
        for callback in self.callbacks:
            callback(self.logger)


class StreamingLLMCallbackHandler(AsyncCallbackHandler):
    """Callback handler for streaming LLM responses."""

    def __init__(self, websocket):
        self.websocket = websocket

    async def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        
        resp = ChatResponse(sender="bot", message=token, type="stream")
        await asyncio.sleep(0.3)
        print(resp.dict())


class StreamingStdOutCallbackHandlerYield(StreamingStdOutCallbackHandler):
    def __init__(self, queue):
        self.q = queue
    def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> None:
        """Run when LLM starts running."""
        with self.q.mutex:
            self.q.queue.clear()

    def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        """Run on new LLM token. Only available when streaming is enabled."""
        # sys.stdout.write(token)
        # sys.stdout.flush()
        self.q.put(token)

    def on_llm_end(self, response, **kwargs: Any) -> None:
        """Run when LLM ends running."""
        self.q.put("###finish###")


# class StreamingStdOutCallbackHandler(BaseCallbackHandler):
#     """Callback handler for streaming. Only works with LLMs that support streaming."""

#     def on_llm_start(
#         self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
#     ) -> None:
#         """Run when LLM starts running."""

#     def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
#         """Run on new LLM token. Only available when streaming is enabled."""
#         sys.stdout.write(token)
#         sys.stdout.flush()

#     def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
#         """Run when LLM ends running."""

#     def on_llm_error(
#         self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
#     ) -> None:
#         """Run when LLM errors."""

#     def on_chain_start(
#         self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
#     ) -> None:
#         """Run when chain starts running."""

#     def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> None:
#         """Run when chain ends running."""

#     def on_chain_error(
#         self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
#     ) -> None:
#         """Run when chain errors."""

#     def on_tool_start(
#         self, serialized: Dict[str, Any], input_str: str, **kwargs: Any
#     ) -> None:
#         """Run when tool starts running."""

#     def on_agent_action(self, action: AgentAction, **kwargs: Any) -> Any:
#         """Run on agent action."""
#         pass

#     def on_tool_end(self, output: str, **kwargs: Any) -> None:
#         """Run when tool ends running."""

#     def on_tool_error(
#         self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
#     ) -> None:
#         """Run when tool errors."""

#     def on_text(self, text: str, **kwargs: Any) -> None:
#         """Run on arbitrary text."""

#     def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> None:
#         """Run on agent end."""

# class QuestionGenCallbackHandler(AsyncCallbackHandler):
#     """Callback handler for question generation."""

#     def __init__(self, websocket):
#         self.websocket = websocket

#     async def on_llm_start(
#         self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
#     ) -> None:
#         """Run when LLM starts running."""
#         resp = ChatResponse(
#             sender="bot", message="Synthesizing question...", type="info"
#         )
#         await self.websocket.send_json(resp.dict())


class ChatResponse(BaseModel):
    """Chat response schema."""

    sender: str
    message: str
    type: str

    @validator("sender")
    def sender_must_be_bot_or_you(cls, v):
        if v not in ["bot", "you"]:
            raise ValueError("sender must be bot or you")
        return v

    @validator("type")
    def validate_message_type(cls, v):
        if v not in ["start", "stream", "end", "error", "info"]:
            raise ValueError("type must be start, stream or end")
        return v
