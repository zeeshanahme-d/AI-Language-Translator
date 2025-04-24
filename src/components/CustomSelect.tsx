import React from 'react';
import { SupportedLanguaes } from '../utils/Content';
import "./_style/Style.scss";


interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value = "", onChange }) => {

    return (
        <div className="custom-select">
            <select className='select' value={value} onChange={(e) => onChange(e.target.value)}>
                {SupportedLanguaes.map((option) => (
                    <option key={option.name} value={option.type}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;