import React from 'react';
//icons
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { MdOutlineClear, MdOutlineDone } from "react-icons/md";
import { BsCopy } from "react-icons/bs";

//style
import "./_style/Style.scss";
import { SupportedLanguages } from '../utils/Content';

interface ButtonGroupProps {
    buttonsToHide: string[];
    setState: React.Dispatch<React.SetStateAction<any>>;
    state: any;
    isTargetInput?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonsToHide, setState, state, isTargetInput = false }) => {
    const [isSpeaking, setIsSpeaking] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);

    const buttons = [
        {
            Label: 'Clear',
            onClick: () => handleClear(),
            Icon: <MdOutlineClear />,
            Condition: state.text !== ''
        },
        {
            Label: 'Text to Speech',
            onClick: () => HandleSpeakText(),
            Icon: <IoVolumeHighOutline />,
            Condition: state.text !== '' && !isSpeaking
        },
        {
            Label: 'Pause Speech',
            onClick: () => handleSpeechPuse(),
            Icon: <IoVolumeMuteOutline />,
            Condition: state.text !== '' && isSpeaking
        },
        {
            Label: 'Copy',
            onClick: () => !isCopied && handleCopy(),
            Icon: !isCopied ? <BsCopy /> : <MdOutlineDone />,
            Condition: state.text !== ''
        },
    ];

    const handleClear = () => {
        setState((prev: any) => ({ ...prev, text: '', textError: "", wordCount: 0 }));
    };

    const HandleSpeakText = () => {
        const text = isTargetInput ? state.translatedText : state.text;
        const lang = isTargetInput ? state.targetLanguage : state.sourceLanguage;
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const languageObj: any = SupportedLanguages?.find((value: any) => value.type === lang) || {};

        const matchingVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(languageObj.code?.toLowerCase()));

        if (matchingVoice) {
            utterance.voice = matchingVoice;
            utterance.lang = languageObj.code;
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        } else {
            console.warn(`No matching voice found for ${languageObj.code}, using default`);
        }
    };

    const handleCopy = () => {
        const text = isTargetInput ? state.translatedText : state.text;
        navigator.clipboard.writeText(text).then(() => {
            console.log("copied");
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };
    const handleSpeechPuse = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className='button-group'>
            {buttons.map((button, index) => {
                if (buttonsToHide.includes(button.Label) || !button.Condition) {
                    return null;
                }
                return (
                    <button aria-label={button.Label} title={button.Label} className='custom-button' key={index} onClick={() => button.onClick()}>
                        {button?.Icon}
                    </button>
                )
            })}
        </div>
    );
};

export default ButtonGroup;