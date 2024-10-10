from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, GPT2LMHeadModel, GPT2Tokenizer
import difflib

app = Flask(__name__)
CORS(app)

# Load GPT-2 model for text generation
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)
text_gen_model = pipeline('text-generation', model=model, tokenizer=tokenizer, device=-1)

common_phrases = [
    "how are you",
    "how are you doing",
    "how are things going",
    "how are you feeling today",
    "how are you doing today",
    "how is the weather",
    "how to train a dog",
    "how to bake a cake",
    "how do I install Streamlit",
    "how do transformers models work"
    
]

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    user_input = data.get('input', '')

    if user_input:
        suggestions = difflib.get_close_matches(user_input, common_phrases, n=3, cutoff=0.1)
        return jsonify({'suggestions': suggestions})

    return jsonify({'suggestions': []})

if __name__ == '__main__':
    app.run(debug=True)