const express = require('express');
const router = express.Router();


function sendEventsToAll(newFact) {
    clients.forEach(client => client.res.write(
        `data: ${JSON.stringify(newFact)}\n\n`
    ));
}


router.post('/', async (req, res) => {
    console.log('in color.router')
    // const newFact = req.body;
    // colors.push(newFact);
    // res.json(newFact);
    // return sendEventsToAll(newFact);

})