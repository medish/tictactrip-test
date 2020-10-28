const express = require('express');
const app = express();
const justifyRouter = require('./routes/justify');
const tokenRouter = require('./routes/token');
const config = require('config');

const PORT = process.env.PORT || config.get('PORT');

app.use(justifyRouter);
app.use(tokenRouter);

app.get('/', (request, response) => {
    response.status(200).send('API test');
})
const server = app.listen(PORT, (error) => {
    if(!error) console.log(`Listening on port ${PORT}...`);
});

module.exports = server;