const express = require('express');
const bodyParser = require('body-parser');
const textFactory = require('../textFactory');
const jwt = require('jsonwebtoken');
const config = require('config');
const ms = require('ms');
const router = express.Router();
const rateLimit = {};
const WORDS_LIMIT = config.get('RATE_WORDS_LIMIT');
const SECRET_KEY = config.get('SECRET_KEY');
const MAX_WIDTH = config.get('JUSTIFY_LINE_WIDTH');
const RATE_EXPIRY_TIME = config.get('RATE_EXPIRY_TIME');


router.use(bodyParser.text({ type : 'text/plain'}));

router.post('/api/justify/:lineWidth?', checkAuth, checkRate, (request, response) => {
    const text = request.body;
    const LINE_WIDTH = request.params.lineWidth || MAX_WIDTH
    const jLines = textFactory.textToJustifiedText(text, LINE_WIDTH);
    const jText = textFactory.textBuilder(jLines);

    response.type('text/plain');
    return response.status(201).send(jText);
});

function checkAuth(request, response, next){
    const token = request.header('x-auth-token');
    if(!token) return response.status(401).send('No token');
    
    jwt.verify(token, SECRET_KEY, (err, data) => {
        if(err) return response.status(401).send('Invalid token');

        if(token in rateLimit === false)  {
            rateLimit[token] = { words : 0, issuedAt : Date.now()}; 
        }

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
    const currToken = rateLimit[token];
    
    let currRate = currToken.words;

    const expiredTime = Date.now() - currToken.issuedAt;

    if(expiredTime < ms(RATE_EXPIRY_TIME) && currRate + lenWords > WORDS_LIMIT){
        return response.sendStatus(402);
    }


    if(expiredTime > ms(RATE_EXPIRY_TIME)){
        currToken.issuedAt = Date.now();
        currToken.words = 0;
    }
    currToken.words += lenWords;
    rateLimit[token] =  currToken;
    console.log(currToken);

    next();
}

module.exports = router; 