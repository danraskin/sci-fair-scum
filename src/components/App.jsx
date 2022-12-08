import {useEffect, useState} from 'react';
import './App.css';


function App() {

    const [ listening, setListening ] = useState(false);
    const [randomColor, setColor] = useState([0,0,0]);    

    useEffect( () =>{
        if (!listening) {
            let events
            events = new EventSource('https://sci-fair-scum.herokuapp.com/stream'); //try this out for heroku deploy
            if(process.env.PORT) {
                console.log(process.env.PORT)
            } else {
                console.log('no process.')
            }
            // if (process.env.PORT) {
            //     events = new EventSource('https://sci-fair-scum.herokuapp.com/stream'); //try this out for heroku deploy
            // } else {
            //     events = new EventSource('http://localhost:5000/stream'); //for local deploy. does process.env.PORT work here?
            // }

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