import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")  # Your Mistral API key
# print(MISTRAL_API_KEY)
# Function to generate AI suggestions using Mistral API
def generate_ai_suggestions(input_text, num_suggestions=3):
    try:
        # Replace with the actual Mistral API endpoint
        url = "https://api.mistral.ai/v1/chat/completions"  # Hypothetical endpoint

        headers = {
            "Authorization": f"Bearer {MISTRAL_API_KEY}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "mistral-7b",  # Replace with the actual model name if needed
            "prompt": input_text,
            "max_tokens": 12,
            "temperature": 1.5,
            "n": 1
        }

        # Send POST request to Mistral API
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Assuming the response contains a list of choices
        suggestions = [choice['text'] for choice in response.json().get('choices', [])]
        return suggestions

    except requests.exceptions.RequestException as e:
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

