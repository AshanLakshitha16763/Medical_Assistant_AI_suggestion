from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.environ.get("GROQ_API_KEY")
)

def generate_ai_suggestions(input_text):
    try:
        
        completion = client.chat.completions.create(
            model="llama3-groq-70b-8192-tool-use-preview",

            messages=[
                {"role": "system", "content": "you are a text-generation model. You get the words from the user and generate the text which starts with the words given by the user. for example, if the user says 'How' you can generate the text like 'How are you?', 'How is your day going?','How old are you' etc. Do not include any phrases like: 'I am sorry but I do not have the capability to perform this task for you, I am happy to help you with any other queries you may have.', 'Here are a few text options that start with','Note that the provided function is in Python' etc. Also do not use numbering for the suggestion Just give one suggestion for the text completion."},
                
                {"role": "user", "content": input_text}
            ],
            max_tokens=12,  
            temperature=1.5, 
        )
       
        suggestions = [choice.message.content for choice in completion.choices]
        return suggestions

    except Exception as e:
        print(f"Error generating suggestions: {e}")
        return []

# Endpoint to check if the server is running
@app.route('/', methods=['GET'])
def status_check():
    
    return jsonify({'prompt': "Server is Up and Running..."})

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    user_input = data.get('input', '')

    if user_input:
        ai_suggestions = generate_ai_suggestions(user_input, num_suggestions=3)
        return jsonify({'suggestions': ai_suggestions}) 

    return jsonify({'suggestions': []})

@app.route('/get-first-prompt', methods=['GET'])
def get_first_prompt():
    return jsonify({'prompt': "Type something here..."})

if __name__ == '__main__':
    app.run(debug=True)
