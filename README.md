# Medical_Assistant
Medical_Assistant is a system that uses AI-driven speech-to-text and text-generation technologies to help doctors that creates patient symptom lists and prescriptions.


## Frontend_Configuration

### Install dependencies for the React frontend:

* Go to frontend folder:

  ```
    cd Medical_Assistant/AI_Suggestion_App/frontend

    ```
    npm start
    ```

It will run on your browser.

### And also you want to stop the server:

In your terminal, press ```c``` + ```control``` keys.


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
    2. Activate the environment:

    ```
    source venv/bin/activate
    ```
    3. Install Dependencies(Can change According to your requirement):

    ```
    pip install Flask transformers tourch
    ```

> For ```Windows```, below I provided document to create Virtual Environment. 

If you want to get further more details refer; </br>https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/ .

### After creating Virtual Environment,run below commond in your terminal:

```
run app.py
```
It will run on your browser. 

### And also you want to stop the server:

In your terminal, press ```c``` + ```control``` keys.




