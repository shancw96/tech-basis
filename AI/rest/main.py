import uvicorn
import asyncio
import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from fastapi import FastAPI
from utils import StreamRequest
from utils import reduce_tokens_below_limit, send_message, createEmbedding, StreamRequest
from prompts import QA_PROMPT
from fastapi.middleware.cors import CORSMiddleware
from utils import HistoryLoggerAsyncHandler, get_or_create_chatgroup_vector_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = [
        "http://localhost",
        "http://localhost:1002",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
embeddings = createEmbedding("openai")

@app.post("/chat-process")
def stream(body: StreamRequest):
    """1. create or get VectorDB """
    persist_dir = "store/chat_history"

    db = get_or_create_chatgroup_vector_db(body.chat_group_id, embeddings, persist_dir)
    
    print("正在检索历史聊天记录...")
    docs = reduce_tokens_below_limit(db.similarity_search(query=body.prompt, k=body.memory_size or 50), limit=2048)

    docs_contents = "\n".join([doc.page_content for doc in docs])

    """3. reformat the question"""
    format_question = QA_PROMPT.format_prompt(context=docs_contents, question=body.prompt).to_string()
    print("正在重新组织提问内容...", format_question)

    async def update_vectordb_on_llm_end(chatlist = []):
        await asyncio.get_running_loop().run_in_executor(None, db.add_texts, chatlist)
        await asyncio.get_running_loop().run_in_executor(None, db.persist)
    
    # TODO 云端存储历史记录
    # async def update_mysql_on_llm_end(chatlist = []):
    #     print("TODO: save chatlog to mysql", chatlist)

    """4. QA """
    return StreamingResponse(
        send_message(
            format_question, 
            extra_callback=HistoryLoggerAsyncHandler([update_vectordb_on_llm_end])
            ), 
        media_type="text/event-stream", 
        headers={'content-type': 'application/octet-stream'}
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
