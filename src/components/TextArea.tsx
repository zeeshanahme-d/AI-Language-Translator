import React from 'react';
import { RightSideStartedLanguages } from '../utils/Content';

interface TextAreaProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    language?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder, className = "" ,language=""}) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{textAlign: RightSideStartedLanguages.includes(language) ? "right" : "left"}}
        />
    );
};

export default TextArea;