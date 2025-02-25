import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/ModelSelector.css'; 

const ModelSelector = ({ onModelChange, isSpinnerVisible }) => {
    const [selectedModel, setSelectedModel] = useState(null);

    const models = [
        { name: 'GPT2',
          code: 'GPT2',
          description: 'GPT Model' },
        { name: 'BioGPT', 
          code: 'BIOGPT',
          description:'Biomedical GPT Model'},
        { name: 'GPT-3.5 Turbo',
          code: 'GPT-3.5 Turbo',
          description: 'GPT-3.5 Turbo Model' }, 
        { name: 'GPT-4o', 
          code: 'GPT-4o',
          description: 'GPT-4o Model'},
        { name: 'Groq', 
          code: 'Groq',
          description: ' llama3-8b Model'},
        { name: 'Mistral', 
          code: 'Mistral',
          description: 'Mixtral-large Model'},
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
                disabled={isSpinnerVisible}
            />
        </div>
    );
};

export default ModelSelector;