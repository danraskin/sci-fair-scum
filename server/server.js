const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const colorRouter = require('./routes/color.router.js');
const streamRouter = require('./routes/stream.router.js');
const stream = streamRouter.router;

app.use(cors()); // allows cross-origin request sharing from all sources. see cors api for more uses.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//initialize server? i don''t know what this does. comment out for future.
// app.get('/status', (req, res) => {
//     res.json({clients: clients.length})
// });

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