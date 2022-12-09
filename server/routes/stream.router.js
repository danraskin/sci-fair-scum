const express = require('express');
const onFinished = require('on-finished');
const router = express.Router();

// middleware for GET requests to the /stream endpoint.
// This modules establishes server-client connection for SSE.
// colors.router.js POSTS to client.

let clients = [];

router.get('/', ( req, res ) => {
    // console.log(req);
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    } // headers necessary for SSE
    res.writeHead(200, headers); //sends headers to client

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient); // stores new client to client list

    // console.log(req);
    clients.forEach(client => console.log(client.id));


    // req.on('close', () => {
    //     console.log(clients);
    //     console.log(`${clientId} Connection closed`);
    //     clients = clients.filter(client => client.id !== clientId);
    //     console.log('post filter', clients);
    // });
})

module.exports = {
    router,
    clients
}