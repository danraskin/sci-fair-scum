import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import PatchGrid from './PatchGrid';

function AppTerminal() {
    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0,0]);
    const [ patch, setPatch ] = useState({col: randomColor, num: 2});
    const [ playing, setPlaying ] = useState(false);
    const [ freq, setFreq ] = useState(120);
    
    useEffect( () =>{
        if (!listening) {
            getSource();
            setListening(true);
        }
        setFreq(randomColor[0]+120);
        __().sine({id: "osc1", frequency: freq}).gain(.2).dac();

    },[randomColor]);    

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

    const savePatch = ()=> {
        setPatch({
            col: randomColor,
            num: 2
        })
        // console.log(patch.col, patch.num);
    }

    const setPlay = () => {
        if ( playing ) {
            __("gain").ramp(0,.5,"gain",.2);

            setTimeout( ()=>{
                __("#osc1").stop();
                __("gain").attr({"gain":.2});
                setPlaying(false);
            },500);
            
            console.log("stopped playing");
        }
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
        <button onClick={e=>setPlay()}>M U T E</button>
        <PatchGrid
            patch = { patch }
            randomColor = { randomColor}
            playing = { playing }
            setPlaying = { setPlaying }
            freq = { freq }
        />
    </div>
    )
}

export default AppTerminal;