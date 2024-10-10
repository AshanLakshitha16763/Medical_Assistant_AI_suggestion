# Medical_Assistant
Medical_Assistant is a system that uses AI-driven speech-to-text and text-generation technologies to help doctors that creates patient symptom lists and prescriptions.


## Next_Word_Prediction
```
pip install tensorflow pandas numpy nltk
```
* nltk - Natural Language Toolkit
* tokenizer = RegexpTokenizer(r'\w+')
* data - data/fake_or_real_news.csv


## Backend_Configuration

### Go to Backend file:

* Give the right path to your terminal:

    ```
    cd ./ copy_file_path
    ```

### Create and active Virtual Environment:

* When you are developing the backend using ```Python``` (e.g., a Flask API), it's a good idea to use a virtual environment to manage Python dependencies separately from other projects.

 * Virtual environments keep all the required packages (like Flask, transformers, etc.) isolated, so they don't interfere with system Python packages or other projects.

* following below steps to use a virtual environment:(```For macOs```)


    1. Create the environment:

    ```
    python -m venv .venv
    ```


