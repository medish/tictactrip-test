const express = require('express');
const bodyParser = require('body-parser');
const textFactory = require('../textFactory');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const rateLimit = {};
const WORDS_LIMIT = config.get('RATE_WORDS_LIMIT');
const SECRET_KEY = config.get('SECRET_KEY');
const MAX_WIDTH = config.get('JUSTIFY_LINE_WIDTH');

router.use(bodyParser.text({ type : 'text/plain'}));

router.post('/api/justify', checkAuth, checkRate, (request, response) => {
    const text = request.body;
     
    const jLines = textFactory.textToJustifiedText(text, MAX_WIDTH);
    const jText = textFactory.textBuilder(jLines);

    response.type('text/plain');
    return response.status(201).send(jText);
});

function checkAuth(request, response, next){
    const token = request.header('x-auth-token');
    if(!token) return response.status(401).send('No token');
    
    jwt.verify(token, SECRET_KEY, (err, data) => {
        if(err) {
            response.status(401);
            if(err.name === 'TokenExpiredError'){
                // delete token from rate
                delete rateLimit[token];
                return response.send('Expired token');
            }
            return response.status(401).send('Invalid token');
        }

        if(typeof rateLimit[token] === 'undefined')  rateLimit[token] = 0;

        request.data = data;
        request.token = token;
        next(); 
    })
}

function checkRate(request, response, next){
    const text = request.body;
    // empty or invalid request
    if(Object.keys(text).length === 0) {
        return response.status(406).send('Format not supported');
    }
    
    const token = request.token;
    const lenWords = textFactory.textToWords(text).length;    
    
    let currRate = rateLimit[token];
        currRate += lenWords;

    if(currRate > WORDS_LIMIT){
        return response.sendStatus(402);
    }
    rateLimit[token] = currRate;
    console.log(currRate +" "+WORDS_LIMIT);
    next();
}

module.exports = router; 