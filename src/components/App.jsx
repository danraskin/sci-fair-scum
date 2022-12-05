import {useState} from 'react';
import './App.css';


function App() {

    const [randomColor, setColor] = useState([1,59,100]);    
    // let randomColor=[];
    function randomInteger(max) {
        return Math.floor(Math.random()*(max + 1));
    }
    
    function newColor() {
        let r = randomInteger(255);
        let g = randomInteger(255);
        let b = randomInteger(255);
        setColor([r,g,b]);
        console.log(randomColor);

    }

    var es = new EventSource('localhost:5000/stream');
 
    es.onmessage = function (event) {
        console.log('event?',event);
    };
    
    // es.addEventListener(eventName, function (event) {
    // });

    return(
        <>
            <div
                className="newColor"
                style={{
                     backgroundColor: `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`
                }}
            ></div>
            <button onClick={e=>newColor()}>new color</button>
        </>
    )
}

export default App;