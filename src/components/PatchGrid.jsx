import {useEffect, useState} from 'react';
import Patch from './Patch';
import './App.css';

function PatchGrid({ patch, randomColor }) {
    // fill and square aren't used, commented out
    // const fill = 'rgb(100,10,130)';
    // const fill = `rgb(${patch.col[0]},${patch.col[1]},${patch.col[2]})`;
    // const square = patch.num;

    const grid=[1,2,3,4,5,6,7,8,9];
    return (
        <div className="patchGrid">
            { grid.map(i => (
                <Patch
                    key = { i }
                    i = { i }
                    // fill = { fill } 
                    randomColor = { randomColor }
                />
            ))}   
        </div>
    )
}

export default PatchGrid;