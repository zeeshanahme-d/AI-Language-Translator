import React, { use, useEffect, useMemo, useState } from 'react'

import './App.css'
import TextArea from './components/TextArea'
import { MdGTranslate } from "react-icons/md";
import { debounce } from './utils/Helpers';

const App: React.FC = () => {

  const [state, setState] = useState({
    text: '',
    translatedText: '',
    sourceLanguage: 'ur',
    targetLanguage: 'en',
    textError: '',
    wordCount: 0,
    tottleCount: 2000,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.text.trim() !== '') {
      timer = setTimeout(() => {
        translateText(state.text, state.sourceLanguage, state.targetLanguage);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [state.text, state.sourceLanguage, state.targetLanguage]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state.wordCount >= state.tottleCount) {
      setState({ ...state, textError: 'You have reached the maximum limit of 2000 words' })
    } else {
      setState({ ...state, textError: '' })
    }

    const count = e.target.value.length
    const value = e.target.value;
    setState(prev => ({ ...prev, text: value, wordCount: count }));
  };

  const translateText = async (text: string, sourceLang: string, targetLang: string) => {
    if (!state.text.trim() || state.textError) return;

    try {
      const response = await fetch(
        `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`
      );
      const data = await response.json();
      setState((prev) => ({ ...prev, translatedText: data.translation }));
    } catch (error) {
      console.error('Translation error:', error);
      setState((prev) => ({ ...prev, translatedText: 'Translation failed.' }));
    }
  };


  return (
    <div className="App">
      <div className='container'>
        <h1 className='heading'>Lingua<span className="highlight">Speak</span></h1>
        <span className='subheading'>LinguaSpeak: Bridging Voices, Connecting Worlds.</span>
        <div className='content'>
          <div className='text-area-container'>
            <div className='text-area-content'>
              <TextArea
                value={state.text}
                onChange={(e) => handleOnChange(e)}
                placeholder='Enter text to translate'
                className='text-area'
              />
              <div className='bottom-container'>
                <span className='counter' style={{ color: state.wordCount >= state.tottleCount ? "red" : "#fff" }}>{state.wordCount}/{state.tottleCount}</span>
              </div>
            </div>

            <span className='error'>{state?.textError}</span>
          </div>
          <div className='text-area-container'>
            <div className='text-area-content'>
              <TextArea
                value={state.translatedText}
                onChange={() => { }}
                placeholder='Target language'
                className='text-area'
                language={state.targetLanguage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
