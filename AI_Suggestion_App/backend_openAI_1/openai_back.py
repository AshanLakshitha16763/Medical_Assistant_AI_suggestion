from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
from openai import OpenAI
from dotenv import load_dotenv

import os

app = Flask(__name__)
CORS(app)

load_dotenv()
# Set OpenAI API key
# openai.api_key = os.getenv("OPENAI_API_KEY")  # Set this in your environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Set this in your environment variables

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_ai_suggestions(input_text, num_suggestions=3):
    try:
        


        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",  
            messages=[
                {"role": "system", "content": "you are a text-generation model. You get the words from the user and generate the text which starts with the words given by the user."},
                {"role": "user", "content": input_text}
            ],
            max_tokens=20,  
            temperature=0.2  
        )
        print(completion.choices[0].message)
       # refined_input = response.choices[0].message.content  
       # return refined_input

        
        # Call OpenAI's completion API (Previous)
        """
        response = openai.Completion.create(
            engine="gpt-3.5-turbo-instruct",  # Replace with the desired model, e.g., 'gpt-4' or 'text-davinci-003'
            prompt=input_text,
            max_tokens=50,
            n=num_suggestions,
            stop=None,
            temperature=0.7
        )
        return [choice['text'].strip() for choice in response['choices']]
        """

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
