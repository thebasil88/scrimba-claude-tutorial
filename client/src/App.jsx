import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  baseURL: 'https://apis.scrimba.com/api.anthropic.com/'
})

function App() {

  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [summaryCount, setSummaryCount] = useState(10);

  async function summarize() {
    const text = textInput;
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 200,
      system: 'You are a text summarizer. When asked to summarize a text send back the summary.',
      messages: [
        {
          'role': 'user',
          'content': [
            {
              'type': 'text',
              'text': `Summarize this text: ${text}`
            }
          ]
        }
      ]
    });
    setTextOutput(response.content[0].text)
  }

  return (
    <>
      <div className='bg-gray-200 rounded-2xl drop-shadow-lg p-4 mx-auto max-w-2xl'>
          <div id="input" className='mb-8'>
            <textarea className='textInput w-full h-40' value={textInput} onChange={(e)=>setTextInput(e.target.value)}></textarea>
          </div>
          <div id="controllers" className='mb-8 flex flex-row justify-start space-x-4'>
            <div className='flex-grow'>
            <input type="range" name="summaryLength" onChange={(e)=> setSummaryCount(e.target.value) } value={summaryCount} min="1" max="100" />
            { summaryCount }
            </div>
            <div  className='flex-grow'>
              <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={()=>summarize()}>Summarize!</button>
            </div>
          </div>
          <div id="output" className='mb-8'>
            <textarea className='textInput w-full h-40' value={textOutput}></textarea>
          </div>
          <div id="finalButtons" className='flex flex-row justify-end space-x-4'>
            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" >Copy</button>
            <button className="h-10 px-6 font-semibold rounded-md bg-white border border-slate-200 text-slate-900" type="button">
            Clear</button>
          </div>
      </div>
    </>
  )
}

export default App
