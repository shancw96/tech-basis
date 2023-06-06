
from fastapi import FastAPI
from langchain import LLMChain
import uvicorn

from langchain.embeddings.openai import OpenAIEmbeddings

from prompts import QA_PROMPT
from typing import AsyncIterable, Awaitable

from langchain.chat_models import ChatOpenAI
from langchain.chains.summarize import load_summarize_chain

import asyncio
import os
from typing import AsyncIterable

import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
from pydantic import BaseModel
from langchain.chat_models import AzureChatOpenAI
from dotenv import load_dotenv
from langchain.callbacks import get_openai_callback

from utils import HistoryLoggerAsyncHandler, get_or_create_chatgroup_vector_db

load_dotenv('/Users/wushangcheng/project/tech-basis/AI/fastapi/.env')


OPENAI_API_BASE = os.getenv('OPENAI_API_BASE')
OPENAI_API_VERSION = os.getenv('OPENAI_API_VERSION')
OPENAI_API_TYPE = os.getenv('OPENAI_API_TYPE')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


app = FastAPI()


class StreamRequest(BaseModel):
    message: str

"""
    TODO: use custom QA chain refactor send_message function 
    custom_qa_chain = LLMChain(llm=chatllm, prompt=QA_PROMPT, verbose=True)
    print("正在发起提问...")
    res = custom_qa_chain.predict(context = summary, question = payload.prompt)
"""
async def send_message(message: str, callbacks = []) -> AsyncIterable[str]:
    callback = AsyncIteratorCallbackHandler()
    
    model = AzureChatOpenAI(
        openai_api_base=OPENAI_API_BASE,
        openai_api_version=OPENAI_API_VERSION,
        deployment_name='gpt-35',
        openai_api_key=OPENAI_API_KEY,
        openai_api_type=OPENAI_API_TYPE,
        streaming=True,
        verbose=True,
        callbacks=[callback, *callbacks]
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


class StreamRequest(BaseModel):
    """Request body for streaming."""
    message: str



    
@app.post("/stream")
def stream(body: StreamRequest):
    """1. create or get VectorDB """
    persist_dir = "store"
    embeddings = OpenAIEmbeddings(deployment="embedding")
    chat_group_id = "fixed_chat_group_id"

    db = get_or_create_chatgroup_vector_db(chat_group_id, embeddings, persist_dir)
    print("正在检索历史聊天记录...")
    docs = db.similarity_search(query=body.message, k=4)

    """2. summarize the docs"""
    print("正在组织生成记忆...", docs)
    summaryllm = AzureChatOpenAI(
        openai_api_base=OPENAI_API_BASE,
        openai_api_version=OPENAI_API_VERSION,
        deployment_name='gpt-35',
        openai_api_key=OPENAI_API_KEY,
        openai_api_type=OPENAI_API_TYPE,
        verbose=True,
    )
    
    chain = load_summarize_chain(summaryllm, chain_type="stuff")
    summary = chain.run(docs)
    print("生成记忆：", summary)

    """3. reformat the question"""
    format_question = QA_PROMPT.format_prompt(context=summary, question=body.message).to_string()
    print("正在重新组织提问内容...", format_question)

    async def update_vectordb_on_llm_end(chatlist = []):
        db.add_texts(chatlist)
        db.persist()

    def update_mysql_on_llm_end(chatlist = []):
        print("TODO: save chatlog to mysql", chatlist)

    logCallback = HistoryLoggerAsyncHandler([update_vectordb_on_llm_end, update_mysql_on_llm_end])

    """4. QA """
    return StreamingResponse(send_message(format_question, callbacks=logCallback), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
