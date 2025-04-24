import React from 'react';
import "./_style/Style.scss";

interface ButtonGroupProps {
    buttonsToHide: string[];
    setState: React.Dispatch<React.SetStateAction<any>>;
    state: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonsToHide, setState, state }) => {

    const buttons = [
        {
            Label: 'Clear',
            onClick: () => handleClear(),
            Icon: '',
            Condition: state.text !== ''
        },
    ]

    const handleClear = () => {
        setState((prev: any) => ({ ...prev, text: '', textError: "", wordCount: 0 }));
    }

    return (
        <div className='button-group'>
            {buttons.map((button, index) => {
                if (buttonsToHide.includes(button.Label) || !button.Condition) {
                    return null;
                }
                return (
                    <button className='custom-button' key={index} onClick={() => button.onClick()}>
                        <span>{button?.Icon ? button?.Icon : button.Label}</span>
                    </button>
                )
            })}
        </div>
    );
};

export default ButtonGroup;