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
                __("#lfo1").attr({ frequency: lfoFreq, gain: randomColor[0] }).start();
                break;
            case 5:
                lfoFreq = randomColor[2] / randomColor [0]
                __("#lfo2").attr({ frequency: lfoFreq, gain: randomColor[1] }).start();
                break;
            case 6:
                lfoFreq = randomColor[0] / randomColor [1]
                __("#lfo3").attr({ frequency:lfoFreq,gain: randomColor[2] }).start();
                break;
            
            // Last row
            // case 7:
            //     lfoFreq = randomColor[0] / randomColor [1]
            //     __("#lpf1").attr({ frequency: 4000 })
            //     __("#lfo_lpf1").attr({ frequency: 1/4, gain: 400})
            //     __("#lpf1, #lfo_lpf1").start();
            //     break;
            // case 8:
            //     lfoFreq = randomColor[0] / randomColor [1]

            //     __("#lpf2").attr({ frequency: 2000 })
            //     __("#lfo_lpf2").attr({ frequency: 50, gain: 4000})
            //     __("#lpf2, #lfo_lpf2").start();
            //     break;
            // case 9: 
            //     __("#lpf3").attr({ frequency: 2000 })
            //     __("#lfo_lpf3").attr({ frequency: 1/4, gain: randomColor[0] + randomColor[1]+randomColor[2]})
            //     // __("#lpf3, #lfo_lpf3").start();
            //     break;
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