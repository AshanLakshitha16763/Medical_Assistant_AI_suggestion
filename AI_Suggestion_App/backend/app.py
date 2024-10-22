
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import difflib

app = Flask(__name__)
CORS(app)

common_phrases = [
    "Patient reports severe chest pain and shortness of breath.",
    "Patient reports severe chest pain and dizziness.",
    "The patient was prescribed a low dose of ACE inhibitors.",
    "The patient was prescribed a course of antibiotics.",
    "The patient is experiencing fatigue and loss of appetite.",
    "The patient is experiencing mild headaches.",
    "Patient complains of abdominal pain and nausea.",
    "Patient complains of back pain and stiffness.",
    "The patient is experiencing shortness of breath and chest pain.",
    "The patient is experiencing severe chest pain and dizziness.",
    "The patient is experiencing severe chest pain and shortness of breath.",
    "The patient is experiencing severe chest pain and fatigue.",
    "patient reports severe chest pain and shortness of breath.",
    "patient reports severe chest pain and dizziness."
]


model_name = "microsoft/BioGPT"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
text_gen_model = pipeline('text-generation', model=model, tokenizer=tokenizer, )


def generate_ai_suggestions(input_text, num_suggestions=3):
    generated = text_gen_model(input_text, max_length=10, num_return_sequences=num_suggestions, num_beams=2)
    return [g['generated_text'].strip() for g in generated]

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    user_input = data.get('input', '')

    if user_input:
        common_suggestions = difflib.get_close_matches(user_input, common_phrases, n=2, cutoff=0.1)
        ai_suggestions = generate_ai_suggestions(user_input, num_suggestions=2)
        return jsonify({'suggestions': common_suggestions + ai_suggestions})

    return jsonify({'suggestions': []})


"""# Endpoint to provide suggestions based on user input
@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    user_input = data.get('input', '')

    if user_input:
        # Find suggestions based on the input
        suggestions = difflib.get_close_matches(user_input, common_phrases, n=3, cutoff=0.1)
        return jsonify({'suggestions': suggestions})

    return jsonify({'suggestions': []}) """

# Endpoint to get the first prompt as the placeholder
@app.route('/get-first-prompt', methods=['GET'])
def get_first_prompt():
    if common_phrases:
        return jsonify({'prompt': common_phrases[0]})
    return jsonify({'prompt': "Type something here..."})

if __name__ == '__main__':
    app.run(debug=True)




# Modify the suggest function
