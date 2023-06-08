import asyncio
from typing import Optional, Union, List
from pydantic import BaseModel
from langchain.vectorstores import Chroma
import chromadb
from chromadb.config import Settings
from typing import Any, Dict, List
from pydantic import BaseModel, validator
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import (LLMResult,)
from webbrowser import Chrome
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
from typing import AsyncIterable, Awaitable, List, Optional
from langchain.docstore.document import Document
import asyncio
import os
from typing import AsyncIterable
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.schema import HumanMessage
from pydantic import BaseModel
from langchain.chat_models import AzureChatOpenAI
from dotenv import load_dotenv
from langchain.embeddings import HuggingFaceEmbeddings


load_dotenv('/Users/wushangcheng/project/tech-basis/AI/rest/.env')

OPENAI_API_BASE = os.getenv('OPENAI_API_BASE')
OPENAI_API_VERSION = os.getenv('OPENAI_API_VERSION')
OPENAI_API_TYPE = os.getenv('OPENAI_API_TYPE')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


model = AzureChatOpenAI(
    openai_api_base=OPENAI_API_BASE,
    openai_api_version=OPENAI_API_VERSION,
    deployment_name='gpt-35',
    openai_api_key=OPENAI_API_KEY,
    openai_api_type=OPENAI_API_TYPE,
)


# 判断是否存在该聊天分组的矢量数据库，不存在就新建一个
def get_or_create_chatgroup_vector_db(chat_id, embedding, persist_dir="store"):
    if not is_chroma_collection_exist(chat_id, persist_dir):
        print("正在使用历史聊天记录为当前聊天分组构建矢量数据库...")
        # TODO: retrive chat history from db
        chat_history = [
            "an assistant is glad to help user, and provide useful advice"]
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
            loader = DirectoryLoader(docs_source_path, glob="**/*.md")
            docs = loader.load()
            print(f'You have {len(docs)} document(s) in your data')
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000, chunk_overlap=0)
            split_docs = text_splitter.split_documents(docs)
            vectorstore = Chroma.from_documents(
                split_docs, embedding, persist_directory=persist_dir)
            vectorstore.persist()
            print(f'已为当前文档集生成矢量数据')
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
            await callback(self.logger)


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


def createEmbedding(type: str):
    if type == 'openai':
        return OpenAIEmbeddings(deployment="embedding", chunk_size=1)
    # FIXME: huggingface和chromadb 集成报错
    elif type == 'huggingface':
        model_name = "sentence-transformers/all-mpnet-base-v2"
        model_kwargs = {'device': 'cpu'}
        encode_kwargs = {'normalize_embeddings': False}
        return HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs
        )
    else:
        return None


def reduce_tokens_below_limit(docs: List[Document], limit: int = 2048):
    num_docs = len(docs)
    tokens = [model.get_num_tokens(doc.page_content) for doc in docs]
    token_count = sum(tokens[:num_docs])
    while token_count > limit:
        num_docs -= 1
        token_count -= tokens[num_docs]
    return docs[:num_docs]


async def send_message(message: str, extra_callback) -> AsyncIterable[str]:
    callback = AsyncIteratorCallbackHandler()

    model = AzureChatOpenAI(
        openai_api_base=OPENAI_API_BASE,
        openai_api_version=OPENAI_API_VERSION,
        deployment_name='gpt-35',
        openai_api_key=OPENAI_API_KEY,
        openai_api_type=OPENAI_API_TYPE,
        streaming=True,
        verbose=True,
        temperature=0.8,
        callbacks=[callback, extra_callback],
    )

    async def wrap_done(fn: Awaitable, event: asyncio.Event):
        """Wrap an awaitable with a event to signal when it's done or an exception is raised."""
        try:
            await fn
        except Exception as e:
            print(f"Caught exception: {e}")
        finally:
            # Signal the aiter to stop.
            event.set()
    # Begin a task that runs in the background.
    task = asyncio.create_task(wrap_done(
        model.agenerate(messages=[[HumanMessage(content=message)]]),
        callback.done),
    )

    async for token in callback.aiter():
        # Use server-sent-events to stream the response
        yield f"{token}"
    await task


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


class StreamRequest(BaseModel):
    """Request body for streaming."""
    prompt: str
    chat_group_id: str
    memory_size: Optional[int] = None


class ChatMessage(BaseModel):
    chat_history: List[str]
    prompt: str
    chat_id: Optional[Union[str, None]] = None
