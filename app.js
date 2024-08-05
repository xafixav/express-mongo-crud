const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json()); // PARSE JSON body request


app.get('/', (_req, res) => {
    res.send('hello world');
});

module.exports = { app };