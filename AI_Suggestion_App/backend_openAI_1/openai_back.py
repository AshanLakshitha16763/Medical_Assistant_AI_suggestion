from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")  # Set this in your environment variables

def generate_ai_suggestions(input_text, num_suggestions=3):
    try:
        # Call OpenAI's completion API
        response = openai.Completion.create(
            engine="gpt-4",  # Replace with the desired model, e.g., 'gpt-4' or 'text-davinci-003'
            prompt=input_text,
            max_tokens=50,
            n=num_suggestions,
            stop=None,
            temperature=0.7
        )
        return [choice['text'].strip() for choice in response['choices']]
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
