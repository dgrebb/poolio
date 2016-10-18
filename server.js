const express = require('express');
const twig = require('twig');
const bodyParser = require('body-parser');
const db = require('redis').createClient();

const app = express();

app.listen(3000, () => {
    console.log('Poolio is ready at http://localhost:3000');
});