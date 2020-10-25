const { request } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const textFactory = require('../textFactory');
const router = express.Router();

router.use(bodyParser.text({ type : 'text/plain'}));


router.post('/api/justify',  (request, response) => {
    const text = request.body;
    
    // empty request
    if(Object.keys(text).length === 0) {
        return response.status(406).send('Format not supported');
    } 

    const jLines = textFactory.textToJustifiedText(text, 80);
    const jText = textFactory.textBuilder(jLines);

    response.type('text/plain');
    return response.status(201).send(jText);
});

module.exports = router; 