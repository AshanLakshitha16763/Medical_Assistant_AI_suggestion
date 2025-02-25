import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ModelSelector from "./components/ModelSelector";
import "../src/styles/App.css";
import NewLineHint from "./components/NewLineHint";
import { Blocks } from "react-loader-spinner";
import axios from "axios";
import Note from "./components/Note";
import Footer from "./components/Footer";

function App() {
    const [selectedModel, setSelectedModel] = useState(null);
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    // Define backend URLs for different models

    const modelBackendUrls = {
        GPT2: "https://gpt2apiimg-388091007362.asia-south1.run.app/suggest",
        BIOGPT: "https://biosuggimg-1081715976745.asia-south1.run.app/suggest",
        "GPT-3.5 Turbo":
            "https://gpt3-5sug3v1img-310190366499.asia-south1.run.app/suggest",
        "GPT-4o": "https://gpt4opv1img-416355045963.asia-south1.run.app/suggest",
        Groq: "https://groqllama3pv1img-211290179414.asia-south1.run.app/suggest",
        Mistral: "https://mistralpv1img-767801539703.us-central1.run.app/suggest",
    };

    // Define backend base URL for different models
    const modelBaseUrls = {
        GPT2: "https://gpt2apiimg-388091007362.asia-south1.run.app",
        BIOGPT: "https://biosuggimg-1081715976745.asia-south1.run.app",
        "GPT-3.5 Turbo": "https://gpt3-5sug3v1img-310190366499.asia-south1.run.app",
        "GPT-4o": "https://gpt4opv1img-416355045963.asia-south1.run.app",
        Groq: "https://groqllama3pv1img-211290179414.asia-south1.run.app",
        Mistral: "https://mistralpv1img-767801539703.us-central1.run.app",
    };

    const handleModelChange = async (model) => {
        setSelectedModel(model);
        setIsSpinnerVisible(true);

        const baseUrl = modelBaseUrls[model.code];
        if (!baseUrl) {
            console.error("Base URL not found for the selected model:", model.code);
            setIsSpinnerVisible(false);
            return;
        }

        try {
            // Fetch data from the "/" endpoint
            const response = await axios.get(`${baseUrl}/`);
            console.log("Response from backend:", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsSpinnerVisible(false);
        }
    };

    return (
        <div className="App">
            <h1> AI Assistant for Writing Medical Prescriptions</h1>
            <div className="search-bar-outercontainer">
                {/* {!isSpinnerVisible &&  */}
                    <ModelSelector
                        onModelChange={handleModelChange}
                        isSpinnerVisible={isSpinnerVisible}
                    />
                {/* } */}

                {!isSpinnerVisible && 
                    <div className="search-bar-container-wrapper">
                        <NewLineHint selectedModel={selectedModel} />
                        <SearchBar
                            selectedModel={selectedModel}
                            backendUrl={
                                selectedModel ? modelBackendUrls[selectedModel.code] : null
                            }
                        />
                    </div>
                }
                    {!isSpinnerVisible && <Note /> }
                    
            </div>
                    {!isSpinnerVisible && <Footer/>}

           {isSpinnerVisible && ( 
                <div className="spinner">
                    <Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />

                    <div>
                        Please wait, {[selectedModel.code]} Model's Backend is Loading...
                    </div>
                </div>
             )}
        </div>
    );
}

export default App;
