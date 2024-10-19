from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the BioGPT model and tokenizer
model_name = "microsoft/BioGPT" # 1.56GB
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Define a function for text completion
def generate_text(prompt, max_length=50):
    # Encode the input text
    inputs = tokenizer(prompt, return_tensors="pt")

    # Generate completion
    output = model.generate(inputs['input_ids'], max_length=max_length, num_return_sequences=1)

    # Decode and return the completed text
    return tokenizer.decode(output[0], skip_special_tokens=True)

# List of 5 example prompts for medical text completion
prompts = [
    "Following the review of medical history",
    "Patient reports severe back pain",
    "The patient was prescribed",
    "Common symptoms of depression including",
    "Following the physical assessment,"
]

# Generate completions for each prompt
for prompt in prompts:
    print(f"Prompt: {prompt}")
    print(f"Completion: {generate_text(prompt)}\n")