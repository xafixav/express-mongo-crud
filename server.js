const app = require('./app.js');
const PORT = parseInt(process.env.APP_PORT_NUMBER, 10); // 10 IN HERE IS THE BASE FOR DECIMAL

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

app.listen(PORT, () => {
    console.log(`app listening to port: ${PORT}`);
});