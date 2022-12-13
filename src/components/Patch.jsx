import { useState, useEffect } from 'react';

function Patch({ i, randomColor }) {
    const [fill, setFill] = useState(`rgb(240,240,240)`);

    useEffect( ()=> {
        console.log('in useEffect');
    },[fill]);

    const setFillCol = ()=> {
        console.log(randomColor);
        setFill(`rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`);
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