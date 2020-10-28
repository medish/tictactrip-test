const express = require('express');
const app = express();
const justifyRouter = require('./routes/justify');
const tokenRouter = require('./routes/token');
const config = require('config');

const PORT = process.env.PORT || config.get('PORT');

app.use(justifyRouter);
app.use(tokenRouter);

const server = app.listen(PORT, (error) => {
    if(!error) console.log(`Listening on port ${PORT}...`);
});

module.exports = server;