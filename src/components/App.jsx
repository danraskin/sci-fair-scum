import {useEffect, useState} from 'react';
import './App.css';


function App() {

    const [ facts, setFacts ] = useState([]);
    const [ listening, setListening ] = useState(false);

    const [randomColor, setColor] = useState([1,59,100]);    
    // let randomColor=[];

    useEffect( () =>{
        if (!listening) {
            const events = new EventSource('http://localhost:5000/stream');

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




    // //start



    // var es = new EventSource('localhost:5000/stream');
 
    // es.onmessage = function (event) {
    //     console.log('event?',event);
    // };
    
    // es.addEventListener(eventName, function (event) {
    // });

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
            <button onClick={e=>newColor()}>new color</button>

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