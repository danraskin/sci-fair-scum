import { useState, useEffect } from 'react';

function Patch({ freq, i, randomColor, playing, setPlaying }) {
    const [ fill, setFill ] = useState(`rgb(0,0,0,0)`);

    const [ hasFill, setHasFill ] = useState(false);

    let lfoFreq ;
    let lpfFreq ;

    // const d = new Date();
    useEffect( ()=> {
        console.log('in useEffect');
    },[fill]);

    // OLD ONE NO SOUND
    // const setFillCol = ()=> {
    //     console.log(randomColor);
    //     setFill(`rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`);
    // }

    const reset =()=> {

        setFill(`rgb(240,240,240,0)`);
        setHasFill(false);
       
        switch (i) {
        // OSC ROW
        case 1:
            __("#osc1,#subosc1,#lfo1").stop();
            break;
        case 2:
            __("#osc2,#subosc2,#lfo2").stop();
            break;
        case 3:
            __("#osc3,#subosc3,#lfo3").stop();
            break;
        
        // LFO row
        case 4:
            __("#lfo1").stop();
            break;
        case 5:
            __("#lfo2").stop();
            break;
        case 6:
            __("#lfo3").stop();
            break;
            }
        }


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
                __("#osc3").attr({frequency:freq}).start();
                __("#subosc3").attr({frequency:freq, detune:`${randomColor[1]}`}).start();
                setPlaying(true);
                break;
            
            // LFO row
            case 4:        
                lfoFreq = randomColor[1] + 1 / randomColor [2] + 1
                __("#lfo1").attr({ frequency: lfoFreq, gain: randomColor[0] + 1 }).start();
                break;
            case 5:
                lfoFreq = randomColor[2] + 1 / randomColor [0] + 1
                __("#lfo2").attr({ frequency: lfoFreq, gain: randomColor[1] + 1  }).start();
                break;
            case 6:
                lfoFreq = randomColor[0] + 1 / randomColor [1] + 1
                __("#lfo3").attr({ frequency:lfoFreq,gain: randomColor[2] + 1}).start();
                break;
            
            // Last row
            // case 7:
            //     lfoFreq = randomColor[1] / randomColor [2];
            //     lpfFreq = Math.min(randomColor);
            //     console.log(lpfFreq);
            //     __("#lpf1,#lfo_lpf1").start();
            //     __("#lpf1").attr({ frequency: 10 })
            //     __("#lfo_lpf1").attr({ frequency: 20, gain: 3000})
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
        setHasFill(true);
    }

    return(
        <div className={`ctrl-${i}`}>
            <button className='colorFillButton' onClick={e => setFillCol()} style={{
                backgroundColor: fill,
                border: '2px solid black',
                gridArea: `ctrl-${i}`
            }}></button>
            {
                hasFill &&
                <button className='closeButton' onClick={e => reset()}>reset</button>
            }
        </div>
    )
}

export default Patch;