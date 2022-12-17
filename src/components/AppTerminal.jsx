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

        __().reverb().dac();

        //set oscilattors
        __().sine({
                class: "osc",
                id: "osc1",
                // frequency: freq
            }).gain({
                id: "gain1",
                gain:.2
            }).connect("dac");

        __().sine({
            class: "osc, subosc",
            id: "subosc1",
        }).gain({
            id: "subgain1",
            gain:.1
        }).connect("reverb");

        __().square({
                class: "osc",
                id: "osc2",
            }).gain({
                id: "gain2",
                gain:.02
            }).connect("dac");

        __().square({
                class: "osc, subosc",
                id: "subosc2",
            }).gain({
                id: "gain2",
                gain:.01
            }).connect("reverb");
        
        __().triangle({
                class: "osc",
                id: "osc3",
            }).gain({
                id: "gain3",
                gain:.1
            }).connect("dac");

        __().triangle({
            class: "osc, subosc",
            id: "subosc3",
        }).gain({
            id: "gain3",
            gain:.05
        }).connect("reverb");

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

            __("#gain1").ramp(0,.25,"gain",.2);
            __("#gain2").ramp(0,.25,"gain",.02);
            __("#gain3").ramp(0,.25,"gain",.1);

            __("#subgain1").ramp(0,.25,"gain",.1);
            __("#subgain2").ramp(0,.25,"gain",.01);
            __("#subgain3").ramp(0,.25,"gain",.05);

            setTimeout( ()=>{
                __("*").stop();
                __( "#gain1" ).attr({"gain":.2});
                __( "#gain2" ).attr({"gain":.02});
                __( "#gain3" ).attr({"gain":.1});

                __("#subgain1").attr({"gain":.1});
                __("#subgain2").attr({"gain":.01});
                __("#subgain3").attr({"gain":.05});

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