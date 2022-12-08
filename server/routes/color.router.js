const express = require('express');
const router = express.Router();
const { clients } = require('./stream.router.js');

// middleware for POST to /color endpoint.
// imports 'clients' from stream.router.js and forwards posted data
// to clients.

router.post('/', async ( req, res ) => {
    const newColor = req.body;
    // console.log(req.body);
    res.json(newColor);
    clients.forEach(client => client.res.write(
        `data: ${JSON.stringify(newColor)}\n\n`
    )); //response to client must be in this format for SSE
}); 

module.exports = router;