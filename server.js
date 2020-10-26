
const express = require('express');
const app = express();
const justifyRouter = require('./routes/justify');
const tokenRouter = require('./routes/token');

const PORT = process.env.PORT || 5050;

app.use(justifyRouter);
app.use(tokenRouter);

app.listen(PORT, (error) => {
    if(!error) console.log(`Listening on port ${PORT}...`);
})