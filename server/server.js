const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const colorRouter = require('./routes/color.router.js');
const streamRouter = require('./routes/stream.router.js');
const stream = streamRouter.router

// CORS tutorial
app.use(cors()); // allows cross-origin request sharing from all sources. see cors api for more uses.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//initialize server? i don''t know what this does. comment out for future.
// app.get('/status', (req, res) => {
//     res.json({clients: clients.length})
// });

// // middleware for GET requests to the /stream endpoint.

// let clients = [];
// function eventsHandler(req, res, next) {
//     const headers = {
//         'Content-Type': 'text/event-stream',
//         'Connection': 'keep-alive',
//         'Cache-Control': 'no-cache',
//     } // headers necessary for SSE
//     res.writeHead(200, headers); //sends headers to client

//     const clientId = Date.now();
//     const newClient = {
//         id: clientId,
//         res
//     };
//     clients.push(newClient); // stores new client to client list

//     req.on('close', () => {
//         console.log(`${clientId} Connection closed`);
//         clients = clients.filter(client => client.id !== clientId);
//     });
// }

// // middleware for POST requests to /color endpoint.

// function sendEventsToAll(newColor) {
//     clients.forEach(client => client.res.write(
//         `data: ${JSON.stringify(newColor)}\n\n`

//     ));
// }

// async function addColor(req, res, next) {
//     const newColor = req.body;
//     console.log(req.body);
//     // colors.push(newColor);
//     res.json(newColor);
//     return sendEventsToAll(newColor);
// }

app.use('/color', colorRouter);
app.use('/stream', stream); 

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});