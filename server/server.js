const express = require('express');
const bodyParser = require('body-parser');
// const SSE = require('express-sse');

const app = express();


app.get("/", (req, res) => res.send("hello!"));

app.get("/stream", (req,res) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
})

let i = 0;
function send (res) {
    res.write("data: " + `hello!${i++}\n\n`);
    setTimeout(()=>send(res), 1000);
}

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

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});