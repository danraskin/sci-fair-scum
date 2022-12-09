const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const colorRouter = require('./routes/color.router.js');
const streamRouter = require('./routes/stream.router.js');
const stream = streamRouter.router;

app.use(cors()); // allows cross-origin request sharing from all sources. see cors api for more uses.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/color', colorRouter);
app.use('/stream', stream); 

// checks networked connections.
app.get('/status', (req, res) => {
    res.json({clients: clients.length})
});

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on CORS-enabled server port: ${PORT}`);
});