import {useEffect, useState} from 'react';
import './App.css';

function PatchGrid() {

    const grid=[1,2,3,4,5,6,7,8,9];
    return (
        <div className="patchGrid">
            { grid.map(i => (
                <div
                    key={i}
                    className={`ctrl-${i}`}
                    style={{
                        gridArea: `ctrl-${i}`
                    }}
                />
            ))}
            
        </div>
    )
}

export default PatchGrid;