import { useState, useEffect } from 'react';

function Patch({ freq, i, randomColor, playing, setPlaying }) {
    const [fill, setFill] = useState(`rgb(0,0,0,0)`);

    useEffect( ()=> {
        console.log('in useEffect');
    },[fill]);

    const setFillCol = ()=> {
        console.log(randomColor);
        setFill(`rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`);
        if (!playing) {
            setPlaying(true);
            __("#osc1").frequency(freq).start();
            console.log(freq)
        } else {
            __("#osc1").frequency(freq);
            console.log(playing)

            console.log(freq)

        }
    }

    return(
        <div

            className={`ctrl-${i}`}
            style={{
                backgroundColor: fill,
                border: '2px solid black',
                gridArea: `ctrl-${i}`
            }}
            onClick={e=>setFillCol()}
        />
    )
}

export default Patch;