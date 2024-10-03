import streamlit as st
from transformers import pipeline


@st.cache(allow_output_mutation=True)
def load_model():
    return pipeline('text-generation', model='gpt2',device=-1)

model = load_model()


st.title("AI Text Autocompletion with Hugging Face")


user_input = st.text_input("Start typing your text:")

if user_input:
    
    completions = model(user_input, max_length=50, num_return_sequences=3)

    
    st.subheader("Autocompletion Suggestions:")
    for i, completion in enumerate(completions):
        st.write(f"{i+1}. {completion['generated_text'].strip()}")