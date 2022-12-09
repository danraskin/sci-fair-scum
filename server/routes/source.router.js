const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {
    const streamSource = process.env.STREAMSOURCE || 'http://localhost:5000/stream';
    // console.log('in /source, streamsource: ', streamSource);
    res.send(streamSource);    
})

module.exports = router;