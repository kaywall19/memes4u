import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { MdSearch } from 'react-icons/md'
import CircularProgress from '@material-ui/core/CircularProgress'


function App() {
  const [text, setText] = useState("")
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMemes() {
    setLoading(true)
    const key = "KqWmtJQppVnghAb5y5ylfWWsZPBCWP8g"
    let url = "https://api.giphy.com/v1/gifs/search?"
    url += "api_key=" + key
    url += "&q=" + text
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText("")
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField 
            label="sEaRcH 4 mEmEs" 
            variant="outlined" 
            fullWidth
            color="secondary"
            value = {text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=> {
              if (e.key === "Enter") {
                getMemes()
              }
            }}
          />
          <div id="button">
            <Button id = "search" variant="contained" color="secondary"
              onClick = {getMemes}>
              Search
              <MdSearch id="search"/>
            </Button>
          </div>
        </div>       
      </header>

      {loading && <CircularProgress color="secondary" />}

      <div className="all-memes">
          {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
      </div>

    </div>
  )
}

function Meme({title, images, url}) {
  return <div className="meme">
    <img src={images.fixed_height.url} alt="meme"
    onClick={()=>window.open(url, '_blank')}
    />
    <div className = "meme-title">{title}</div>
  </div>
}

export default App;
