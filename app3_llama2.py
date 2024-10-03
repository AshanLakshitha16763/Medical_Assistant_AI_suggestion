import requests
import json

user_input = "how are"

prompt = """
You are a typing assistant that complete the half written sentence of user.  You display only the recommended suggestions one after another and do not include extra information like "Sure", "happy to help", "based on the user input" likewise.
This is the recommended suggestions: {relevant_document}
The user input is: {user_input}
Compile only the exact starting type recommendations to the user based on the recommended suggestions and the user input.
"""
#This is the prompt sent to the AI model. It provides a context for how the bot should behave (in this case, making short recommendations).

corpus_of_documents = [
    "how are you",
    "how are you doing",
    "how are things going",
    "how are you feeling today",
    "how is the weather",
    "how to train a dog",
    "how to bake a cake",
    "how do I install Streamlit",
    "how do transformers models work"
]

full_response = []
#This initializes an empty list to store the bot's response.

url = 'http://localhost:11434/api/generate'
#The API endpoint where the bot will send a request. In this case, it’s a local server (localhost) running on port 11434.

# the payload being sent to the API
data = {
    "model": "llama2",
    # Refers to the AI model being used.

    "prompt": prompt.format(user_input=user_input, relevant_document=corpus_of_documents)
    # This is the actual prompt being sent to the model
}

headers = {'Content-Type': 'application/json'}
# This specifies that the content type of the request being sent is JSON.

response = requests.post(url, data=json.dumps(data), headers=headers, stream=True)
"""requests.post: Sends a POST request to the given url.
data=json.dumps(data): Converts the data dictionary to a JSON string.
headers: The request includes the content-type header to let the server know it's receiving JSON data.
stream=True: Tells the server to stream the response (i.e., receive the response bit by bit instead of all at once)."""

# Processing the Response
try:
  
    for line in response.iter_lines():
      
        if line:
            decoded_line = json.loads(line.decode('utf-8'))
            
            full_response.append(decoded_line['response'])
finally:
    response.close()
"""try...finally block: Ensures that the response is closed even if an error occurs.
response.iter_lines(): Reads the streamed response line by line.
line.decode('utf-8'): Converts each line from bytes to a UTF-8 string.
json.loads(): Parses each line as JSON.
decoded_line['response']: Extracts the response from the parsed JSON and appends it to the full_response list.
response.close(): Closes the connection to the API."""

print(''.join(full_response))