from langchain import PromptTemplate


prompt_template = """You are a Assistant, You will follow Human's Ask, Use the following pieces of context to answer the question Human asked. Try to give some Answer Human may like.

{context}

Human Question: {question}
Assistant Answer:"""
QA_PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)


_template = """Given the following Chat History between assistant and human, and a follow up question asked by human, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)
