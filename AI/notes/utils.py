from langchain.vectorstores import Chroma
import chromadb
from chromadb.config import Settings

from langchain.document_loaders import DirectoryLoader

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma


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


def is_chroma_collection_exist(collection_name, persist_dir):
    print(collection_name, persist_dir)
    try:
        client = chromadb.Client(Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory=persist_dir
        ))
        client.get_collection(name=collection_name)
        return True
    except Exception as e:
        print(e)
        return False


# 判断是否存在该聊天分组的矢量数据库，不存在就新建一个
def get_or_create_chatgroup_vector_db(chat_id, embedding, persist_dir="store"):
    if not is_chroma_collection_exist(chat_id, persist_dir):
        print("正在使用历史聊天记录为当前聊天分组构建矢量数据库...")
        # TODO: retrive chat history from db
        chat_history = [
            "System: You are a assistant, you will answer Human questions, use the following pieces of context to answer the question . Try to give some answer Human may like."]
        vectordb = Chroma.from_texts(
            persist_directory=persist_dir, texts=chat_history, embedding=embedding, collection_name=chat_id)
        vectordb.persist()
        vectordb = None

    return Chroma(persist_directory=persist_dir, embedding_function=embedding, collection_name=chat_id)



def get_or_init_docs_collection(collection_name, docs_source_path, embedding, persist_dir):
    print('code in')
    try:
        if not is_chroma_collection_exist(collection_name=collection_name, persist_dir=persist_dir):
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

        return Chroma(persist_directory=persist_dir, embedding_function=embedding, collection_name=collection_name)
    except Exception as e:
        print("####文档矢量数据库加载失败####")
        print(e)
