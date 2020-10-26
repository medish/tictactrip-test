const express = require('express');
const bodyParser = require('body-parser');
const textFactory = require('../textFactory');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.use(bodyParser.text({ type : 'text/plain'}));


router.post('/api/justify', checkAuth, (request, response) => {
    const text = request.body;
    
    // empty or invalid request
    if(Object.keys(text).length === 0) {
        return response.status(406).send('Format not supported');
    } 

    const jLines = textFactory.textToJustifiedText(text, 80);
    const jText = textFactory.textBuilder(jLines);

    response.type('text/plain');
    return response.status(201).send(jText);
});

function checkAuth(request, response, next){
    const token = request.header('x-auth-token');
    if(!token) return response.status(401).send('No token');
    
    jwt.verify(token, 'custom', (err, decoded) => {
        if(err) return response.status(401).send('Invalid token');
        request.user = decoded;
        next(); 
    })
}

module.exports = router; 