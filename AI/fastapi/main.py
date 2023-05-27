from fastapi import FastAPI
import uvicorn

from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter


OPENAI_API_KEY = "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"

embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)


def load_all_courses(dir):
  loader = DirectoryLoader(dir, glob = "**/*.md")
  docs = loader.load()
  return docs



app = FastAPI()


@app.get("/")
async def root():
    docs = load_all_courses("/home/shancw/project/tech-basis/AI/fastapi")
    print (f'You have {len(docs)} document(s) in your data')
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    split_docs = text_splitter.split_documents(docs)
    persist_directory = 'blog_vector_storage'

    vectorstore = Chroma.from_documents(split_docs, embeddings, persist_directory=persist_directory)
    vectorstore.persist()

    vectordb = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    query = "what is fastapi？"
    docs = vectordb.similarity_search(query)

    llm = OpenAI(temperature=0, openai_api_key=OPENAI_API_KEY)
    chain = load_qa_chain(llm, chain_type="map_reduce")

    split_docs = text_splitter.split_documents(docs)
    
    res = chain.run(input_documents=split_docs, question=query)

    return {"message": res}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)