/**
 * @module routes/token
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const config = require('config');
const router = express.Router();

/**
 * Secret key used to generate a token
 * Imported from local config file.
 * @name SECRET_KEY
 */
const SECRET_KEY = config.get('SECRET_KEY');


router.use(bodyParser.json());

/**
 * Roote to get access token for a given user
 * @name /api/token
 */
router.post('/api/token', (request, response) => {
    const user = request.body;
    if(!user.mail) return response.status(400).send('No user found');
    
    const token = jwt.sign(user, SECRET_KEY);
    response.status(200).json({token , mail : user.mail});
})

module.exports = router;