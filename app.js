const express = require('express');
const app = express();
require('dotenv').config();


const PORT = parseInt(process.env.APP_PORT_NUMBER, 10); // 10 IN HERE IS THE BASE FOR DECIMAL

app.get('/', (req, res) => {
    res.send('hello world');
});


app.listen(PORT, () => {
    console.log(`app listening to port: ${PORT}`);
});