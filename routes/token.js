const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('config');

const EXPIRY_TIME = config.get('TOKEN_EXPIRY_TIME');
const SECRET_KEY = config.get('SECRET_KEY');

const router = express.Router();

router.use(bodyParser.json());

router.post('/api/token', (request, response) => {
    const user = request.body;
    if(!user) return response.status(400).send('No user found');
    
    const token = jwt.sign(user, SECRET_KEY, { expiresIn : EXPIRY_TIME});
    response.json({token , mail : user.mail});
})



module.exports = router;