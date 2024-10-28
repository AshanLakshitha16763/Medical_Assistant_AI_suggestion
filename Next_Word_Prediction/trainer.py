from transformers import BioGptTokenizer, BioGptForCausalLM, Trainer, TrainingArguments
from datasets import load_dataset

# Load the BioGPT tokenizer and model
tokenizer = BioGptTokenizer.from_pretrained('microsoft/BioGPT')
model = BioGptForCausalLM.from_pretrained('microsoft/BioGPT')

# Load dataset
dataset = load_dataset('csv', data_files='Next_Word_Prediction/data/medical_completion_dataset.csv')



# Split the dataset into (80% train, 20% validation)
dataset = dataset['train'].train_test_split(test_size=0.2)

"""
# Tokenize the dataset for causal language modeling
def tokenize_function(examples):
    inputs = tokenizer(examples['Input'], padding="max_length", truncation=True, max_length=128)
    inputs['labels'] = inputs['input_ids'].copy()  # Set input_ids as labels for causal LM task
    return inputs
"""
def tokenize_function(examples):
    # Split the symptoms by comma and join them with a space
    symptoms = [symptom.strip() for symptom in examples['symptoms'].split(',')]
    text = ' '.join(symptoms)
   
    # Tokenize the text
    inputs = tokenizer(text, padding="max_length", truncation=True, max_length=128)
    inputs['labels'] = inputs['input_ids'].copy()  # Set input_ids as labels for causal LM task
    return inputs

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Set up training arguments
training_args = TrainingArguments(
    output_dir='./results',          # output directory
    eval_strategy="epoch",           # evaluate at each epoch
    per_device_train_batch_size=16,  # batch size for training
    per_device_eval_batch_size=16,   # batch size for evaluation
    num_train_epochs=3,              # number of training epochs
    weight_decay=0.01,               # strength of weight decay
    logging_dir='./logs',            # directory for storing logs
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets['train'],
    eval_dataset=tokenized_datasets['test'],  # Use the split validation set
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model and tokenizer
model.save_pretrained('./fine_tuned_BioGPT')
tokenizer.save_pretrained('./fine_tuned_BioGPT')

"""Generating train split: 14 examples [00:01, 12.37 examples/s]
Map: 100%|████████████████████████████████████████████████████████████████████████████████████████████████| 11/11 [00:00<00:00, 34.31 examples/s]
Map: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████| 3/3 [00:00<00:00, 203.78 examples/s]
{'eval_loss': 12.436408996582031, 'eval_runtime': 9.2513, 'eval_samples_per_second': 0.324, 'eval_steps_per_second': 0.108, 'epoch': 1.0}        
{'eval_loss': 9.28521728515625, 'eval_runtime': 8.3021, 'eval_samples_per_second': 0.361, 'eval_steps_per_second': 0.12, 'epoch': 2.0}            
{'eval_loss': 8.515273094177246, 'eval_runtime': 6.4811, 'eval_samples_per_second': 0.463, 'eval_steps_per_second': 0.154, 'epoch': 3.0}
{'train_runtime': 331.7213, 'train_samples_per_second': 0.099, 'train_steps_per_second': 0.009, 'train_loss': 13.370978037516275, 'epoch': 3.0}  
100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████| 3/3 [05:31<00:00, 110.55s/it] """