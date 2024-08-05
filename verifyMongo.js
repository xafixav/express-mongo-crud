const { MongoClient } = require('mongodb');
require('dotenv').config();

// Update the URI with the correct credentials
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected successfully to MongoDB');

    // Access the admin database
    const adminDb = client.db('admin');

    // Query the system.users collection to get user information
    const users = await adminDb.collection('system.users').find({}).toArray();
    
    // Print the list of users
    console.log('Users:', users);
    
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  } finally {
    // Close the client
    await client.close();
  }
}

// Run the function and catch any unhandled errors
run().catch(console.dir);