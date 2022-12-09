import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0]);

    async function getSource() {
        try {
            const response = await axios.get('/source'); // gets stream source URL. this is dev code to simplify local/heroku testing.
            const events = new EventSource(response.data); // establishes link with EventSource url to receive SSE. don't konw why this needs full URL rather than just '/source'. different method than axios?
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

    return(
        <>
            {
                randomColor && <div
                    className="newColor"
                    style={{
                        backgroundColor: `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`
                    }}
                ></div>
            }
            {/* <button onClick={e=>newColor()}>new color</button> */}

            {/* <div>
                {
                    facts.map((fact, i) => (
                        <ul key={i}>
                            <li>{fact.info}: {fact.source}</li>
                        </ul>
                    ))
                }
            </div> */}
        </>
    )
}

export default App;