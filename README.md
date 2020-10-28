# Tictactrip test
A RESTful api using Node.js, to justify a given text
## Installation
First you need to install npm dependencies in the project folder using `npm install` command.
## Available commands
```
npm test # test using Jest.
npm run coverage # to test the code coverage.
npm run start # start 'server' without nodemon.
npm run dev # start 'server' using nodemon.
npm run docs # generate API docs.
```
## Available end-points
### POST /api/token
Generate a token for a given user (be sure you are sending a correct object), it returns an error if no user is found.

#### Request body (raw)
```javascript
{ mail : 'medish@test.com'}
```
#### Response
```javascript
{ token : "generated_token"
  mail : "user's mail"
}
```
### POST /api/justify/:lineWidth?
Justify the text passed in the request body (be sure you are sending a correct content-type and a valid token) 
#### Headers
```bash
Content-Type : text/plain
x-auth-token : generated_token
```
#### Request body (raw)
`text`
#### Response
`justified text`
#### Important
For any generated token, you have access to justify `RATE_WORDS_LIMIT` every `RATE_EXPIRY_TIME`, (see below ***Config file*** section).
## Config file
This file is used to set the default parameters used in the app 
All parameters are defined in `config/default.json`, you can update with yours.

```bash
PORT # server's port used locally
SECRET_KEY # secret key used to generate a token (using jwt)
JUSTIFY_LINE_WIDTH # maximum width of each line (used to justify)
RATE_WORDS_LIMIT # number of words allowed.
RATE_EXPIRY_TIME # expiry time of rate limit (per token)
```
## Deploy
The app is deployed to [Heroku](https://heroku.com/). 
## Test
To test the app, you either run it locally using `npm run start` command or open the app at the [URL](https://tictactrip-test-medish.herokuapp.com/) `https://tictactrip-test-medish.herokuapp.com/`
To test the routes, you can use any REST api client.

### Note
This server keeps a JSON object in memory to store the tokens' rate limit. If the server is restarted the object returns empty.
