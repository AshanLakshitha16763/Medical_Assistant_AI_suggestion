# Medical_Assistant
Medical_Assistant is a system that uses AI-driven speech-to-text and text-generation technologies to help doctors that creates patient symptom lists and prescriptions.

## AI_Suggestion_App

### Frontend_Configuration

* Change current directory to frontend folder:
    ```
    cd Medical_Assistant/AI_Suggestion_App/frontend
    ```
* To install dependencies 
    ```
    npm install
    ```
* To run the frontend
    ```
    npm start
    ```

* Now, it will run on your browser.
* To stop the server:
In your terminal, press ```ctrl``` + ```c``` keys.


### Backend_Configuration
* Use a new seperate terminal for the backend
* Change current directory to backend folder:
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
* Change the path of your terminal:
    ```
    cd Medical_Assistant/Next_Word_Prediction
    ```

#### Setting up the Virtual Environment:
 * Refer the documentation to create and activate the virtual environment. (https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
  
 * To install Dependencies(Can change According to your requirement):
    ```
    pip install transformers==4.30.2 torch sacremoses 
    ```
    
 * To run the Predictor python file:
    ```
    python predictor.py
    ```
 * To run the Trainer python file:
    ```
    pip install transformers[torch] accelerate
    ```
    ```
    python trainer.py
    ```      
 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.
 
  


