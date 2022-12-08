const express = require('express');
const router = express.Router();
const { clients } = require('./stream.router.js');

// middleware for POST requests to /color endpoint.

router.post('/', async ( req, res ) => {
    const newColor = req.body;
    console.log(req.body);
    res.json(newColor);

    clients.forEach(client => client.res.write(
        `data: ${JSON.stringify(newColor)}\n\n`
    ));
}); 

module.exports = router;