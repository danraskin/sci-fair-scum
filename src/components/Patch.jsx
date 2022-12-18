import { useState, useEffect } from 'react';

function Patch({ freq, i, randomColor, playing, setPlaying }) {
    const [ fill, setFill ] = useState(`rgb(0,0,0,0)`);
    let lfoFreq ;

    useEffect( ()=> {
        console.log('in useEffect');
    },[fill]);


    
    

    const setFillCol = ()=> {
        setFill(`rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`);
        switch (i) {

            // OSC ROW
            case 1:
                __("#osc1").attr({frequency:freq}).start();
                __("#subosc1").attr({frequency:freq, detune:`${randomColor[1]}`}).start();
                setPlaying(true);
                break;
            case 2:
                __("#osc2").attr({frequency:freq}).start();
                __("#subosc2").attr({frequency:freq, detune:`${randomColor[1]}`}).start();
                setPlaying(true);
                break;
            case 3:
                __("#osc2").attr({frequency:freq}).start();
                __("#subosc2").attr({frequency:freq, detune:`${randomColor[1]}`}).start();
                setPlaying(true);
                break;
            
            // LFO row
            case 4:
                lfoFreq = randomColor[1] / randomColor [2]
                __("#lfo1").attr({ frequency:lfoFreq, gain: randomColor[0] }).start();
                break;
            case 5:
                lfoFreq = randomColor[2] / randomColor [0]
                __("#lfo2").attr({ frequency: lfoFreq, gain: randomColor[1] }).start();
                break;
            case 6:
                lfoFreq = randomColor[0] / randomColor [1]

                __("#lfo2").attr({ frequency:lfoFreq,gain: randomColor[2] }).start();
                break;
            
            // Last row
            case 7:
                break;
            case 8:
                break;
            case 9: 
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
            onClick={e=>setFillCol()}
        />
    )
}

export default Patch;