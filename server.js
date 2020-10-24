const express = require('express');
const app = express();

const PORT = process.env.PORT || 5050;

app.get('/', (request, response) => {
    response.send("Hello world")
})

app.listen(PORT, (error) => {
    if(!error) console.log(`Listening on port ${PORT}...`);
})