import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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

    ];

    const handleModelChange = (e) => {
        const model = e.value;
        setSelectedModel(model);
        
        // Optional: Call parent component's handler if provided
        if (onModelChange) {
            onModelChange(model);
        }
    };

    const modelOptionTemplate = (option) => {
        return (
            <div>
                <div>{option.name}</div>
                <small style={{ color: 'gray' }}>{option.description}</small>
            </div>
        );
    };

    return (
        <div className="model-selector" style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', // Aligns content to the right
            width: '100%', 
            marginBottom: '15px',
            paddingRight: '100px', // Optional: adds some padding from the right edge
            alignItems: 'center', 
            gap: '10px'
        }}>

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
                style={{ width: '250px' }}
            />
        </div>
    );
};

export default ModelSelector;