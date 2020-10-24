const { request } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.text({ type : 'text/plain'}));


router.post('/api/justify',  (request, response) => {
    const text = request.body;
    
    // empty request
    if(Object.keys(text).length === 0) {
        return response.status(406).send('Format not supported');
    } 

    response.type('text/plain');
    return response.status(201).send(text);
});

module.exports = router; 