import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [translatedText, setTranslatedText] = useState('');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('id'); // Default: Indonesian

  // List of available languages with their corresponding codes
  const languageOptions = [
    { label: 'Indonesian', value: 'id' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Arabic', value: 'ar' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Vietnamese', value: 'vi' }
  ];

  const translateText = async () => {
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('source_language', 'en'); // English as the source language
    data.append('target_language', targetLanguage); // Selected target language
    data.append('text', textToTranslate); // Text to translate

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'x-rapidapi-key': 'a9400b0a1emsh8bcce9fbf79aabbp11d583jsn91f63989cadb',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },
      data: data
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translatedText); // Save translated text in state
    } catch (error) {
      console.error(error);
      setError('Error translating text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Translator App</h1><br />
     
      <div className='mainContainer'>

        <div className="inputBox">
          <textarea
            type="text"
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            placeholder="Enter text to translate (EN)"
            className='Input'/>

          <label style={{color:"black",fontWeight:"600"}}>Select Language: </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className='SelectLanguage'
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={translateText} className='btn'>Translate</button>
        </div>

        <div className="translatedBox">
          {loading ? (
            <p>Translating...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p className='TranslatedText'><b>Translated Text:</b> {translatedText}</p>
          )}
        </div>

      </div>
    </>
  );
}

export default App;
