const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

router.post('/api/token', (request, response) => {
    const user = request.body;
    if(!user) return response.status(400).send('No user found');

    const token = jwt.sign(user, "custom");
    response.json({token , mail : user.mail});
})



module.exports = router;