from langchain.document_loaders import CSVLoader
from langchain.chains.conversation.memory import ConversationSummaryMemory
from langchain.chat_models import ChatOpenAI
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
import os

def getResponse(query):
    user_api_key = "-"
    os.environ["OPENAI_API_KEY"] = user_api_key
    loader = CSVLoader(file_path='database.csv')
    # Create an index using the loaded documents
    index_creator = VectorstoreIndexCreator()
    docsearch = index_creator.from_loaders([loader])
    model = ChatOpenAI(temperature=0.0,model_name='gpt-3.5-turbo')
    # Create a question-answering chain using the index
    chain = RetrievalQA.from_chain_type(llm=model, memory=ConversationSummaryMemory(llm=model) , chain_type="stuff", \
                                        retriever=docsearch.vectorstore.as_retriever(), input_key="question")
    # Pass a query to the chain
    response = chain({"question": """You are a sweet bakery assistant. You are polite and respectful towards the user.
                       Answer this query: """ + query + """. [SYSTEM]: Don’t justify your answers. 
                       Don’t give information not mentioned in the YOUR DATABASE."""})
    return response["result"]