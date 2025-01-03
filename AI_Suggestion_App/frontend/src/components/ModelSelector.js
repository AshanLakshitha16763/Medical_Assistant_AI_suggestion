import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/ModelSelector.css'; 

const ModelSelector = ({ onModelChange }) => {
    const [selectedModel, setSelectedModel] = useState(null);

    const models = [
        { name: 'GPT2',
          code: 'GPT2',
          description: 'General Purpose GPT Model' },
        { name: 'BioGPT', 
          code: 'BIOGPT',
          description:'Specialized Biomedical GPT Model'},
        { name: 'GPT-3.5 Turbo',
          code: 'GPT-3.5 Turbo',
          description: 'GPT-3.5 Turbo Model' }, 
        { name: 'GPT-4.0', 
          code: 'GPT-4.0',
          description: 'GPT-4.0 Model'},
        { name: 'Groq', 
          code: 'Groq',
          description: ' llama3-8b Model'},
        { name: 'Mistral', 
          code: 'Mistral',
          description: 'pixtral-large-latest Model'},
    ];

    const handleModelChange = (e) => {
        const model = e.value;
        setSelectedModel(model);
        if (onModelChange) {
            onModelChange(model);
        }
    };

    const modelOptionTemplate = (option) => {
        return (
            <div className="model-option">
                <div className="model-option-name">{option.name}</div>
                <div className="model-option-description">{option.description}</div>
            </div>
        );
    };

    return (
        <div className="model-selector">
            <label htmlFor="model-dropdown"> </label>
            <Dropdown
                id="model-dropdown"
                value={selectedModel}
                options={models}
                onChange={handleModelChange}
                optionLabel="name"
                valueTemplate={selectedModel => selectedModel ? selectedModel.name : 'Select your Model'}
                itemTemplate={modelOptionTemplate}
                placeholder="Select your Model"
                className="model-dropdown"
            />
        </div>
    );
};

export default ModelSelector;