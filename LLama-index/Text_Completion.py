from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding
import httpx
import time

# Load the document
documents = SimpleDirectoryReader("./data").load_data()

# Set up Ollama with increased timeout
ollama_llm = Ollama(model="llama2", timeout=120)  # Increase timeout to 120 seconds
ollama_embed_model = OllamaEmbedding(model_name="llama2")

# Configure global settings
Settings.llm = ollama_llm
Settings.embed_model = ollama_embed_model

# Create an index
index = VectorStoreIndex.from_documents(documents)

def autocomplete(input_text, max_retries=3, delay=5):
    for attempt in range(max_retries):
        try:
            query_engine = index.as_query_engine()
            response = query_engine.query(f"Complete the following: {input_text}")
            return response.response
        except httpx.ReadTimeout:
            if attempt < max_retries - 1:
                print(f"Request timed out. Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                print("Max retries reached. The server might be overloaded or there might be network issues.")
                return "Error: Unable to complete the request due to timeout."
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return f"Error: {str(e)}"

# Test the autocomplete function
print(autocomplete("How"))  # Should output something like "How are you?"
print(autocomplete("Th"))   # Should output something like "Thanks and regards"