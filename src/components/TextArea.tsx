import React from 'react';
import { RightSideStartedLanguages } from '../utils/Content';
import "./_style/Style.scss";

interface TextAreaProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    language?: string;
    isTranslatedText?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder, className = "", language = "", isTranslatedText = false }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{ textAlign: (RightSideStartedLanguages.includes(language) && isTranslatedText) ? "right" : "left" }}
        />
    );
};

export default TextArea;