// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend"; //does not work on touch
import { useState } from 'react';
import AppTerminal from './AppTerminal'

function App() {

    return(
        // <DndProvider backend={HTML5Backend}>
            <AppTerminal />
        // </DndProvider>
    )
}

export default App;