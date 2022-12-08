const express = require('express');
const router = express.Router();

// middleware for GET requests to the /stream endpoint.

let clients = [];

router.get('/', ( req, res ) => {
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

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
})

module.exports = {
    router,
    clients
}