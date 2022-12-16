import { useState, useEffect } from 'react';

function Patch({ i, randomColor }) {
    const [fill, setFill] = useState(`rgb(240,240,240)`);

    useEffect( ()=> {
        console.log('in useEffect');
    },[fill]);

    // const setFillCol = ()=> {
    //     console.log(randomColor);
    //     setFill(`rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`);
    // }

    const fillOrReset =(e)=> {
        // e.detail is number of clicks it senses, so a double click would be '2'
        switch (e.detail) {
            case 2:
                // if double click, reset to light gray
                setFill(`rgb(240,240,240)`);
                break;
            case 1:
                // if single click (or first half of double click, idk how to avoid)
                // then set to values from color source which are provided w props
                setFill(`rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`);
                break;
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
            // onClick={e=>setFillCol()}
            onClick={e => fillOrReset(e)}
        />
    )
}

export default Patch;