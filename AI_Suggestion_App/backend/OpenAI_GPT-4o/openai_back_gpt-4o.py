from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_ai_suggestions(input_text, num_suggestions=3):
    try:
        
        completion = client.chat.completions.create(
            model="gpt-4o",  
            messages=[
                # {"role": "system", "content": "you are a text-generation model. You get the words from the user and generate the text which starts with the words given by the user. for example, if the user says 'How' you can generate the text like 'How are you?', 'How is your day going?','How old are you' etc."},
                # {"role": "user", "content": input_text}

                #         {
                #     "role": "system",
                #     "content": (
                #         "You are a medical assistant. Your role is to assist users by providing "
                #         "appropriate medical information based on their input. "
                #         "You must generate responses that start with the user's input, "
                #         "and for known medical abbreviations or keywords, provide the most relevant medication, "
                #         "diagnosis, or advice. "
                #         "For example:\n"
                #         "- If the user inputs 'para', respond with 'paracetamol'.\n"
                #         "- If the user inputs 'ibu', respond with 'ibuprofen'.\n"
                #         "- If the user inputs 'cough', respond with advice like 'cough syrup' or 'consult a doctor if persistent'.\n"
                #         "Always prioritize accuracy and clarity in your responses."
                #     )
                # },
                # {"role": "user", "content": input_text}

                {
            "role": "system",
            "content": (
                "You are a text generation model and you help doctors when writing prescriptions. so your text completion must strictly related to medical terms only."
                "For every input, your response must be a symptom or a medical condition or treatment or a drug prescription, "
                "For an example, if user input 'para' your completions must be 'paracetamol 3 times a day' or 'paracetamol tablets as needed' or 'paralyzed two years ago."
                "For an example, if user input 'had' your completions must be 'had been using insulin injection for two years' or 'had several migraine situations for four months.' or 'had prescribed omeprazole for two weeks."
                "Follow these guidelines:\n"
                "- make sure you are not a chatbot just a text generation model, so never ever answer user's questions must complete the sentences instead"
                "- If the user inputs a partial medication name or abbreviation (e.g., 'para'), respond with the full name of the medication (e.g., 'paracetamol') but do not give the definition of the medication. Just give the medication name with a precription. ex: 'para' give suggestion like 'Paracetamol : 3 times a day. \n"
                #"- If the user inputs a symptom (e.g., 'headache'), provide an appropriate medication or advice just don't give different suggestions(e.g., 'headache relief: paracetamol or ibuprofen; consult a doctor if persistent').\n"
                "- Do not generate unrelated or generic responses. Stick strictly to medical content. Generate suggestions according to the user input only.\n"
                "- Do not generate same suggestions for the user input. Generate different suggestions using the same user input.\n"
                "- Use capital or simple letters strictly same as the user input for generation suggestions.\n"
                "- Strictly do not start with any charecters like '@' or '-' when generating suggestions.\n"
                "- Always prioritize accuracy, clarity, and safety in your responses."
            )
        },
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