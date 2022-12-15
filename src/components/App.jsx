import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

import PatchGrid from './PatchGrid'

function App() {

    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0]);
    const [ colorPicker, setColorPicker ] = useState([0,0,0]);
    const [ colorIsSelected, setColorIsSelected] = useState(false);

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


    function selectAColor(rgbArray) {
        setColorPicker(rgbArray);
        setColorIsSelected(!colorIsSelected);
    }

    return(
        <div className="container">
            {
                randomColor && <div
                    className="newColor"
                    style={{
                        backgroundColor: `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`,
                    }}
                >
                    <div id="color-picker" className={`color-selected-${colorIsSelected}`} style={{ backgroundColor: `rgba(${colorPicker[0]},${colorPicker[1]},${colorPicker[2]},${Number(colorIsSelected)})`}}>
                        {
                            colorIsSelected==false ?

                                <button onClick={() => selectAColor(randomColor)}>select this color</button>

                                :

                                <button onClick={() => selectAColor([0,0,0])}>clear selection</button>
                        }
                    </div>
                </div>
            }
            
            <PatchGrid />
        </div>
    )
}

export default App;