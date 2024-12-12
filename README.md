# Medical_Assistant
Medical_Assistant is an innovative AI-powered solution designed to simplify and enhance medical practice. With advanced text-generation capabilities, it assists doctors by efficiently compiling patient symptom lists and drafting accurate prescriptions.

## Testing deployed Application

### Frontend Deployment 

* Link for the deployed frontend github repo through Vercel is [Here.](https://github.com/JehanRodrigo/Medical_Assistant_Deploy)
* Link for the deployed frontend [URL.](https://medical-assistant-deploy.vercel.app/)

### Backend Deployment

* Link for the deployed backend github repo through google cloude platform is [Here.](https://github.com/AshanLakshitha16763/Medi_backend_dockerize)
* Link for the deployed backend [URL.](https://medicalback-34822786368.asia-south1.run.app/)


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
 * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
  
 * To install Dependencies:
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

### Predictor.py

* Change the path of your terminal:
    ```
    cd Medical_Assistant/Next_Word_Prediction
    ```

#### Setting up the Virtual Environment:
 * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

 * After activating Virtual Environment,run below commands in your terminal:
   
#### Installing Dependencies to run predictor.py
 * To install pytorch. Refer the official site [here](https://pytorch.org/get-started/locally/)
 * To install transformers.
   ```
   pip install transformers
   ```
 * To install protobuf.
   ```
   pip install protobuf
   ```
 * To install sacremoses.
   ```
   pip install sacremoses
   ```
 * Now, run the Predictor python file:
    ```
    python predictor.py
    ```
### Trainer_pythorch.py/Trainer_tensorflow.py
#### *** If you did not set up the above environment for the predictor.py, please follow below steps:
   * Change the path of your terminal:
 ```
    cd Medical_Assistant/Next_Word_Prediction
 ```

##### Setting up the Virtual Environment:
  * Refer the documentation to create and activate the virtual environment [here.](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

  * After activating Virtual Environment,run below commands in your terminal:

#### To run trainer_pytorch.py/trainer_tensorflow.py
##### Installing Dependencies
 * To install pytorch. Refer the official site [here](https://pytorch.org/get-started/locally/)
 * To install transformers.
   ```
   pip install transformers
   ```
### *** If you did setup .venv and install dependencies for predictor.py skip the above steps and continue from here....
 * First change the current directory in the terminal and navigate to the virtual environment and activate.
 * To install datasets
   ```
    pip install datasets
    ```
 * To install accelerate
   ```
    pip install accelerate
    ```
 * Now, run the trainer_pytorch.py file:
    ```
    python trainer_pytorch.py
    ```
* Now, run the trainer_tensorflow.py file:
    ```
    python trainer_tensorflow.py
    ```   
 * To stop the server:
    In your terminal, press ```ctrl``` + ```c``` keys.
 
  


