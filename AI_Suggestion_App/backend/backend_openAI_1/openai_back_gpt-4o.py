from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
#from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

#load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_ai_suggestions(input_text, num_suggestions=3):
    try:
        
        completion = client.chat.completions.create(
            model="gpt-4o",  
            messages=[
                {"role": "system", "content": "you are a text-generation model. You get the words from the user and generate the text which starts with the words given by the user. for example, if the user says 'How' you can generate the text like 'How are you?', 'How is your day going?','How old are you' etc."},
                {"role": "user", "content": input_text}
            ],
            max_tokens=12,  
            temperature=1.5,
            n=num_suggestions  
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

# Endpoint to get suggestions
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
