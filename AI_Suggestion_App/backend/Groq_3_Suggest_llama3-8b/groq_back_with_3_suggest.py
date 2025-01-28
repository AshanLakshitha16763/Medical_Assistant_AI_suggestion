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

def generate_ai_suggestions(input_text, num_suggestions=3):
    try:
        suggestions = []
        for _ in range(num_suggestions):
            completion = client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {"role": "system", "content": (
                "You are a text generation model and you help doctors when writing prescriptions. so your text completion must strictly related to medical terms only."
                "For every input, your text completion must be a symptom or a medical condition or treatment or a drug prescription, "
                "For an example, if user input 'para' your completions must be 'paracetamol 3 times a day' or 'paracetamol tablets as needed' or 'paralysed two years ago."
                "For an example, if user input 'had' your completions must be 'had been using insulin injection for two years' or 'had several migraine situations for four months.' or 'had prescribed omeprazole for two weeks."
                "Follow these guidelines:\n"
                "- make sure you are not a chatbot just a text generation model, so never ever answer user's questions! you must give the completedsentences instead. For example, user input 'give a table' you can't response like 'I cannot provide a table. However, I'd be happy'. Instead, you can respond like 'give a tablet of paracetamol'.\n"
                "- **You must strictly, Always start your response as same spellings as the input_text nothing else.!!!**"
                "- If the user inputs a partial medication name or abbreviation (e.g., 'para'), respond with the full name of the medication (e.g., 'paracetamol') but do not give the definition of the medication. Just give the medication name with a prescription. ex: 'para' give suggestion like 'Paracetamol : 3 times a day. \n"
                "- Strickly make sure you don't include anything like '\n' or '\n\n' and '<|start_header_id|><|start_header_id|><|start_header_id|>assistant<|end_header_id|>' inside your response. \n"

                "- Do not generate unrelated or generic responses. Stick strictly to medical content. Generate suggestions according to the user input only.\n"
                "- Do not generate same suggestions for the user input. Generate different suggestions using the same user input.\n"
                "- Use capital or simple letters strictly same as the user input for generation suggestions.\n"
                "- Strictly do not start with any characters like '@' or '-' when generating suggestions.\n"
                "- Always prioritise accuracy, clarity, and safety in your responses."
        )
            },

                    {"role": "user", "content": input_text}
                ],
                max_tokens=12,  
                temperature=1.5,
                n=1  # Generate one suggestion per request
            )
            suggestions.append(completion.choices[0].message.content)
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
    app.run(host="0.0.0.0", port=int("8080"),debug=True)
