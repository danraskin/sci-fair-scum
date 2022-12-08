import {useEffect, useState} from 'react';
import './App.css';


function App() {

    const [ listening, setListening ] = useState(false);
    const [randomColor, setColor] = useState([0,0,0]);    

    useEffect( () =>{
        if (!listening) {
            const events = new EventSource('https://git.heroku.com/sci-fair-scum/stream'); //try this out for heroku deploy

            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                console.log('in useEffect:', parsedData);

                // setFacts((facts) => facts.concat(parsedData));
                setColor(parsedData);
                // console.log(randomColor);
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