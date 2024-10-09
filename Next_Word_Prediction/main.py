import random
import pickle
import numpy as np
import pandas as pd
from nltk.tokenize import RegexpTokenizer

"""from tensorflow.keras.models import Secquential, load_model
from tensorflow.keras.layers import LSTM, Dense, Activation
from tensorflow.keras.optimizers import RMSprop"""

text_df = pd.read_csv("data/fake_or_real_news.csv")

#print(text_df) #Reading CSV is OK


text = list(text_df.text.values) #Converting the text column of CSV to a list
joined_text = " ".join(text) #Joining the list to a single string
partial_text = joined_text[:10000] #Taking a part of the text to train the model

tokenizer = RegexpTokenizer(r'\w+') 
tokens = tokenizer.tokenize(partial_text.lower())

#print(tokens[:10]) #Tokenizing is OK


unique_tokens = np.unique(tokens) #Getting unique tokens
unique_token_index = {token: idx for idx, token in enumerate(unique_tokens)} #Creating a dictionary of unique tokens

#print(unique_token_index) #Creating a dictionary of unique tokens is OK


n_words = 10
input_words = []
next_words = []
for i in range(len(tokens) - n_words): 
    input_words.append(tokens[i:i + n_words]) 
    next_words.append(tokens[i + n_words])

#print(input_words[:10]) #Creating input words is OK
#print(next_words[:10]) #Creating next words is OK 
