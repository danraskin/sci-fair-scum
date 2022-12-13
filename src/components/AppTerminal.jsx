import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import PatchGrid from './PatchGrid';

function AppTerminal() {
    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0]);
    const [ patch, setPatch ] = useState({col: randomColor, num: 2});

    async function getSource() {
        try {
            const streamSource = await axios.get('/source'); // gets stream source URL. this is dev code to simplify local/heroku testing.
            const events = new EventSource(streamSource.data); // establishes link with EventSource url to receive SSE. don't konw why this needs full URL rather than just '/source'. different method than axios?
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setColor(parsedData);
            } // sets react state at every event
        } catch (err) {
            console.log ('error', err);
        }
    }
    
    useEffect( () =>{
        if (!listening) {
            getSource();
            setListening(true);
        }
        __().sine().delay().dac(.05);
    },[randomColor]);    

    const savePatch = ()=> {
        setPatch({
            col: randomColor,
            num: 2
        })
        // console.log(patch.col, patch.num);
    }

    return (
        <div className="container">
            {
                randomColor && <div
                    className="newColor"
                    style={{
                        backgroundColor: `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`,
                    }}
                ></div>
            }
        <button onClick={e=>savePatch()}>Set</button>
        <PatchGrid
            patch = { patch }
            randomColor = { randomColor}
        />
    </div>
    )
}

export default AppTerminal;