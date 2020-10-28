const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('config');

const SECRET_KEY = config.get('SECRET_KEY');

const router = express.Router();

router.use(bodyParser.json());

router.post('/api/token', (request, response) => {
    const user = request.body;
    if(!user.mail) return response.status(400).send('No user found');
    
    const token = jwt.sign(user, SECRET_KEY);
    response.status(200).json({token , mail : user.mail});
})



module.exports = router;