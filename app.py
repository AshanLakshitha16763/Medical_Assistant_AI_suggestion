import streamlit as st
from transformers import pipeline, GPT2LMHeadModel, GPT2Tokenizer
import difflib


@st.cache(allow_output_mutation=True)
def load_text_generation_model():
    model_name = "gpt2"
    tokenizer = GPT2Tokenizer.from_pretrained(model_name)
    model = GPT2LMHeadModel.from_pretrained(model_name)
    return pipeline('text-generation', model=model, tokenizer=tokenizer, device=-1)

text_gen_model = load_text_generation_model()


common_phrases = [
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


st.title("AI-Driven Prompt Suggestion and Text Generation")


st.subheader("Real-time Phrase Suggestion")


search_input = st.text_input("Start typing a phrase:")

if search_input:
    
    suggestions = difflib.get_close_matches(search_input, common_phrases, n=5, cutoff=0.1)

   
    st.write("Suggestions:")
    for suggestion in suggestions:
        st.write(f"- {suggestion}")

# Text input for text generation using GPT-2
#st.subheader("AI Text Autocompletion with GPT-2")

#user_input = st.text_input("Start typing your text for GPT-2:")

#if user_input:
    # Generate text completion using GPT-2
#   completions = text_gen_model(user_input, max_length=50, num_return_sequences=3)

    # Extract and display suggestions
#    st.subheader("Autocompletion Suggestions:")
#    for i, completion in enumerate(completions):
#       st.write(f"{i+1}. {completion['generated_text'].strip()}")
