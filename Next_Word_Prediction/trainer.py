from transformers import BioGptTokenizer, BioGptForCausalLM, Trainer, TrainingArguments
from datasets import load_dataset

# Load the BioGPT tokenizer and model
tokenizer = BioGptTokenizer.from_pretrained('microsoft/BioGPT')
model = BioGptForCausalLM.from_pretrained('microsoft/BioGPT')

# Load your dataset
dataset = load_dataset('csv', data_files='Next_Word_Prediction/data/medical_completion_dataset.csv')

# Tokenize the dataset
def tokenize_function(examples):
    return tokenizer(examples['Input'], padding="max_length", truncation=True, max_length=128)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Set up training arguments
training_args = TrainingArguments(
    output_dir='./results',          # output directory
    eval_strategy="epoch",     # evaluate at each epoch
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
    eval_dataset=tokenized_datasets['validation'],
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model and tokenizer
model.save_pretrained('./fine_tuned_BioGPT')
tokenizer.save_pretrained('./fine_tuned_BioGPT') 

"""PS D:\Projects\Bistec\Medical_Assistant> & d:/Projects/Bistec/Medical_Assistant/Next_Word_Prediction/.venv/Scripts/python.exe d:/Projects/Bistec/Medical_Assistant/Next_Word_Prediction/trainer.py
Map: 100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████| 8/8 [00:00<00:00, 47.87 examples/s]
Traceback (most recent call last):
  File "d:\Projects\Bistec\Medical_Assistant\Next_Word_Prediction\trainer.py", line 33, in <module>
    eval_dataset=tokenized_datasets['validation'],
                 ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^
  File "D:\Projects\Bistec\Medical_Assistant\Next_Word_Prediction\.venv\Lib\site-packages\datasets\dataset_dict.py", line 72, in __getitem__
    return super().__getitem__(k)
           ^^^^^^^^^^^^^^^^^^^^^^
KeyError: 'validation'"""




