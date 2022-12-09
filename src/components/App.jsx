import {useEffect, useState} from 'react';
require('dotenv').config();
import './App.css';


function App() {

    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0]);
    const streamSource = process.env.STREAMSOURCE || 'http://localhost:5000/stream';    
    console.log("process.env, ", process.env);

    useEffect( () =>{
        if (!listening) {
            const events = new EventSource(streamSource);

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log('in useEffect:', parsedData);
                setColor(parsedData);
            }
            setListening(true);
        }
        __().sine().delay().dac(.05);
    }, [listening, randomColor]);

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