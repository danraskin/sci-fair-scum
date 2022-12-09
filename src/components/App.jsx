import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0]);
    // const [ streamSource, setStream ] = useState('');

    // gets stream source URL. this is dev code to simplify local/heroku testing.
    async function getSource() {
        try {
            const response = await axios.get('/source');
            console.log ('in getSource');
            console.log(response.data);
            // setStream(response.data);

            const events = new EventSource(response.data);

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log('in useEffect:', parsedData);
                setColor(parsedData);
            }


            // console.log('in getSource, check useState?', streamSource);
        } catch (err) {
            console.log ('error', err);
        }
    }

    useEffect( () =>{
        if (!listening) {
            getSource();
            
            // const events = new EventSource(streamSource);

            // events.onmessage = (event) => {
            //     const parsedData = JSON.parse(event.data);
            //     console.log('in useEffect:', parsedData);
            //     setColor(parsedData);
            // }
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