import {useEffect, useState} from 'react';
import Patch from './Patch';
import './App.css';

function PatchGrid({ freq, patch, randomColor, playing, setPlaying }) {
    const fill = 'rgb(100,10,130)';
    // const fill = `rgb(${patch.col[0]},${patch.col[1]},${patch.col[2]})`;
    const square = patch.num;

    const grid=[1,2,3,4,5,6,7,8,9];
    return (
        <div className="patchGrid">
            { grid.map(i => (
                <Patch
                    key = { i }
                    i = { i }
                    fill = { fill } 
                    randomColor = { randomColor }
                    playing = { playing }
                    setPlaying = { setPlaying }
                    freq = { freq }
                />
            ))}   
        </div>
    )
}

export default PatchGrid;