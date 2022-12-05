const express = require('express');
const bodyParser = require('body-parser');
    // const SSE = require('express-sse');
const cors = require('cors');
const { response } = require('express');

const app = express();

// CORS tutorial
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//initialize server? i don''t know what this does
app.get('/status', (req, res) => {
    response.json({clients: clients.length})
});

// middleware for GET requests to the /events endpoint.

function eventsHandler(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }
    res.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;

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

// middleware for POST requests to /fact endpoint.

function sendEventsToAll(newFact) {
    clients.forEach(client => client.res.write(
        `data: ${JSON.stringify(newFact)}\n\n`
    ));
}

async function addFact(req, res, next) {
    const newFact = req.body;
    facts.push(newFact);
    res.json(newFact);
    return sendEventsToAll(newFact);
}

app.post('/fact', addFact);

app.get('/events', eventsHandler); 
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

// express-sse stuff >>>>>>
    // const sse = new SSE(["array","containing","initial","(optional)"])

    // app.get('/stream', sse.init);

    // const content = 'hello';
    // let eventName = 'event';
    // let customID = 2;

    // sse.send(content);
    // sse.send(content, eventName);
    // sse.send(content, eventName, customID);
    // sse.updateInit(["array", "containing", "new", "content"]);
    // sse.serialize(["array", "to", "be", "sent", "as", "serialized", "events"]);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

let clients = [];
let facts = [];

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});