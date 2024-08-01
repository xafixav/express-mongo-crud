const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = parseInt(process.env.APP_PORT_NUMBER, 10); // 10 IN HERE IS THE BASE FOR DECIMAL

app.use(express.json()); // PARSE JSON body request


async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB');
    } catch(err) {
        console.error(`Failed to connect to MongoDB, ${err}`);
    }
}

connectToDatabase();



app.get('/', (_req, res) => {
    res.send('hello world');
});


app.listen(PORT, () => {
    console.log(`app listening to port: ${PORT}`);
});