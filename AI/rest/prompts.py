from langchain import PromptTemplate


prompt_template = """You are Assistant, a large language model trained by OpenAI. Given chat history summary between your and user , Follow the user\'s instructions carefully. Respond using markdown, in User's original language

Chat History Summary:
{context}

User : {question}
Assistant:"""
QA_PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)


_template = """Given the following Chat History between assistant and User, and a follow up question asked by User, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)
