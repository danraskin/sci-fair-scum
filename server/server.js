const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const colorRouter = require('./routes/color.router.js');

// CORS tutorial
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//initialize server? i don''t know what this does
app.get('/status', (req, res) => {
    res.json({clients: clients.length})
});

// middleware for GET requests to the /stream endpoint.

function eventsHandler(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }
    res.writeHead(200, headers);

    const data = `data: ${JSON.stringify(colors)}\n\n`;

    res.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        res
    };

    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

// middleware for POST requests to /color endpoint.

function sendEventsToAll(newColor) {
    clients.forEach(client => client.res.write(
        `data: ${JSON.stringify(newColor)}\n\n`
    ));
}

async function addColor(req, res, next) {
    const newColor = req.body;
    console.log(req.body);
    // colors.push(newColor);
    res.json(newColor);
    return sendEventsToAll(newColor);
}

app.post('/color', addColor);
// app.use('/color', colorRouter);

app.get('/stream', cors(), eventsHandler); 
// youtube tutorial >>>>>>
    // app.get("/", (req, res) => res.send("hello!"));

    // app.get("/stream", (req,res) => {
    //     res.setHeader("Content-Type", "text/event-stream");
    //     send(res);
    // })

    // let i = 0;
    // function send (res) {
    //     res.write("data: " + `hello!${i++}\n\n`);
    //     setTimeout(()=>send(res), 1000);
    // }

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

let clients = [];
let colors = [];

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});