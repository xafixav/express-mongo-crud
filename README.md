# Node.js and MongoDB CRUD Application

## Project Overview

This project is a Node.js application that connects to a MongoDB database. The application uses Docker for containerization and `dotenv` to manage environment variables. It includes CRUD operations with MongoDB and demonstrates how to list administrator users.

## Project Structure

- **Node.js Application**: Handles CRUD operations with MongoDB.
- **MongoDB**: Stores application data and administrator user information.
- **Docker**: Manages containerization and environment setup.
- **Environment Variables**: Managed through a `.env` file for configuration.

## Project Architecture

```mermaid
graph TD
    A[Node.js Application] -->|Connects to| B(MongoDB)
    B --> C[Admin User Management]
    A --> D[Docker]
    D -->|Runs| B
    D -->|Runs| A
    A --> E[.env]
    E -->|Holds| F[Environment Variables]
    B -->|Stores| G[Data]
    G -->|CRUD Operations| A
```

## Setup Instructions

### 1. Install Dependencies

**Node.js Dependencies**:
```
npm install mongodb dotenv
```

**Docker**:
Make sure Docker and Docker Compose are installed on your machine.

### 2. Configure Docker and MongoDB

**`docker-compose.yml`**:
```yml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}

volumes:
  mongodb_data:
```

**`.env`**:
```yml
MONGO_INITDB_ROOT_USERNAME=notroot
MONGO_INITDB_ROOT_PASSWORD=notexample
```

### 3. Create Node.js Script

**`index.js`**:
```js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/admin`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const adminDb = client.db('admin');
    const users = await adminDb.collection('system.users').find({}).toArray();
    console.log('Users:', users);
    
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

### 4. Running the Application

**Start Docker Containers**:
```bash
docker-compose up -d
```

**Run Node.js Script**:
```bash
node index.js
```

## Conclusion

This project demonstrates how to set up a Node.js application with MongoDB using Docker and environment variables. It provides a foundation for developing and managing a CRUD application with MongoDB.
