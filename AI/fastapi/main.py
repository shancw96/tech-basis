import time
from fastapi import FastAPI
from langchain import LLMChain
import uvicorn
import chromadb
from langchain.document_loaders import DirectoryLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains.question_answering import load_qa_chain

from chromadb.config import Settings
from fastapi import Query
from chromadb.config import Settings
from prompts import QA_PROMPT

from utils import ChatMessage
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
# two ways to load env variables
# 1.load env variables from .env file
os.environ["http_proxy"] = "http://127.0.0.1:1087"
os.environ["https_proxy"] = "http://127.0.0.1:1087"
os.environ["all_proxy"] = "socks5://127.0.0.1:1080"


OPENAI_API_KEY_ANSWER = "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"

OPENAI_API_KEY_SUMMARY = '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' 

OPENAI_API_KEY_EMBEDDING = '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'

app = FastAPI()


summaryllm = ChatOpenAI(temperature=0.5, openai_api_key=OPENAI_API_KEY_SUMMARY)

@app.post("/chat-process")
async def chat_process(payload):

  # get relative context from vectorDB
  persist_dir = "store"
  embedding = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY_EMBEDDING)

  chatllm = ChatOpenAI(temperature=0.8, openai_api_key=OPENAI_API_KEY_ANSWER)

  try:
    client = chromadb.Client(Settings(
      chroma_db_impl="duckdb+parquet",
      persist_directory=persist_dir
  ))
    client.get_collection(payload.chat_id)
  except Exception as e:
    print("正在为当前聊天分组构建矢量数据库...")
    # TODO: fetch chat-history from db
    chat_history = payload.chat_history if len(payload.chat_history) !=0 else ["Assistant: Hello, I am a assistant, I will follow your ask, use the following pieces of context to answer the question you asked. Try to give some answer you may like."]
    vectordb = Chroma.from_texts(persist_directory=persist_dir, texts = chat_history, embedding=embedding, collection_name=payload.chat_id)
    vectordb.persist()
    vectordb = None

  db = Chroma(persist_directory=persist_dir, embedding_function=embedding, collection_name=payload.chat_id)
  docs = db.similarity_search(query=payload.message, k=3)

  print("正在组织语言...", docs)
  # refine question
  chain = load_summarize_chain(summaryllm, chain_type="stuff")
  summary = chain.run(docs)
  print("生成了上下文", summary)

  format_question = QA_PROMPT.format_prompt(context=summary, question=payload.message).to_string()

  chatllm(format_question)


  # custom_qa_chain = LLMChain(llm=chatllm, prompt=QA_PROMPT, verbose=True)
  # print("正在发起提问...")
  # res = custom_qa_chain.predict(context = summary, question = payload.prompt)
  
  # print("正在保存聊天记录...", ["Human: " + payload.prompt, "Assistant: " + res])
  # db.add_texts(["Human" + payload.prompt, "Assistant: " + res])
  # db.persist()
  
  return {"message": "res"}


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)