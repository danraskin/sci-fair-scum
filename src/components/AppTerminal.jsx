import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import PatchGrid from './PatchGrid';

function AppTerminal() {
    const [ listening, setListening ] = useState(false);
    const [ randomColor, setColor ] = useState([0,0,0,0]);
    const [ patch, setPatch ] = useState({col: randomColor, num: 2});
    const [ playing, setPlaying ] = useState(false);
    const [ freq, setFreq ] = useState(120);
    
    useEffect( () =>{
        if (!listening) {
            getSource();
            setListening(true);
        }
        
        setFreq(randomColor[0]+120);

        //output stub
        __().reverb().compressor().dac();

        //SET OSCILLATORS
        // OSC1
        __().sine({ class: "osc", id: "osc1" })
            .gain({ id: "gain1", gain:.2 })
            .connect("compressor");
        //SUBOSC1
        __().sine({ class: "osc, subosc", id: "subosc1" })
              .connect("reverb");
        //OSC2
        __().sine({ class: "osc", id: "osc2" })
            .gain({ class: "gain", gain:.2 })
            .connect("compressor");
        //SUBOSC2
        __().sine({ class: "osc, subosc", id: "subosc2" })
            .gain({ class: "subgain", gain:.2 })
            .connect("reverb");
        //OSC3
        __().sine({ class: "osc", id: "osc3" })
            .gain({ class: "gain", gain:.2 })
            .connect("compressor");
        //SUBOSC3
        __().sine({ class: "osc, subosc", id: "subosc3"})
            .gain({ class: "subgain", gain:.2 })
            .connect("reverb");

        // SET SUB OSC LFO

        __().lfo({ id:"lfo1", modulates: "frequency" })
            .connect("#subosc1");
        __().lfo({ id:"lfo2", modulates: "frequency" })
            .connect("#subosc2");
        __().lfo({ id:"lfo3", modulates: "frequency" })
            .connect("#subosc3");

        // SET LOWPASS
        // __("#osc1").lowpass({ id: "lpf1 " }).connect("#gain1");
        // __().lfo({ id: "lfo_lpf1" }).connect("#lpf1");
        //__().lfo({ id: "lfo_lpf2" }).connect("#lpf2");
        //__().lfo({ id: "lfo_lpf2" }).connect("#lpf3");

    },[randomColor]);    

    async function getSource() {
        try {
            const streamSource = await axios.get('/source'); // gets stream source URL. this is dev code to simplify local/heroku testing.
            const events = new EventSource(streamSource.data); // establishes link with EventSource url to receive SSE. don't konw why this needs full URL rather than just '/source'. different method than axios?
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setColor(parsedData);
            } // sets react state at every event
        } catch (err) {
            console.log ('error', err);
        }
    }

    const savePatch = ()=> {
        setPatch({
            col: randomColor,
            num: 2
        })
        // console.log(patch.col, patch.num);
    }

    const setPlay = () => {

        if ( playing ) {

            __(".gain").ramp(0,.25,"gain",.2);
            __(".subgain").ramp(0,.25,"gain",.2);


            setTimeout( ()=>{
                __("*").stop();
                __( "gain" ).attr({"gain":.2});
                __(".subgain").attr({"gain":.2});

                setPlaying(false);
            },300);
            
            console.log("stopped playing");
        }
    }


    return (
        <div className="container">
            {
                randomColor && <div
                    className="newColor"
                    style={{
                        backgroundColor: `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`,
                    }}
                ></div>
            }
        <button onClick={e=>setPlay()}>M U T E</button>
        <PatchGrid
            patch = { patch }
            randomColor = { randomColor}
            playing = { playing }
            setPlaying = { setPlaying }
            freq = { freq }
        />
    </div>
    )
}

export default AppTerminal;