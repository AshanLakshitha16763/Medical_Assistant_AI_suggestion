# Medical_Assistant
Medical_Assistant is a system that uses AI-driven speech-to-text and text-generation technologies to help doctors that creates patient symptom lists and prescriptions.

## AI_Suggestion_App

### Frontend_Configuration

#### Install dependencies for the React frontend:

* Go to frontend folder:

    ```
    cd Medical_Assistant/AI_Suggestion_App/frontend
    ```
    ```
    npm install
    ```
    ```
    npm start
    ```

It will run on your browser.

* To stop the server:

In your terminal, press ```ctrl``` + ```c``` keys.


### Backend_Configuration

* Give the right path to your terminal:

    ```
    cd Medical_Assistant/AI_Suggestion_App/backend
    ```

#### Setting up the Virtual Environment:

 * Refer the documentation to create and activate the virtual environment. (https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
  
 * To install Dependencies(Can change According to your requirement):

    ```
    pip install flask flask-cors transformers torch
    ```
    
 * To run the backend python file:
    ```
    python app.py
    ```
    
 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.

## Next_Word_Prediction

#### Predictor.py
 * dependencies:
   
 * installing pytorch: https://pytorch.org/get-started/locally/
   
 * installing transformers and sacremoses
   
    ```
    pip install transformers==4.30.2
    pip install sacremoses
    ```
* trainer.py
  
  ```
  pip install transformers[torch] accelerate
  ```


