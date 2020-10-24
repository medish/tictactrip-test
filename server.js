
const express = require('express');
const app = express();
const justifyRouter = require('./routes/justify');

const PORT = process.env.PORT || 5050;

app.use(justifyRouter);

app.listen(PORT, (error) => {
    if(!error) console.log(`Listening on port ${PORT}...`);
})