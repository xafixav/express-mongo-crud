import { expect } from 'chai';
import { MongoClient } from 'mongodb';
import { app } from '../app.js';
import request from 'supertest';


describe('Enviroment Variables', () => {
    it('should have MONGO_URI set', () => {
        expect(process.env.MONGO_URI).to.not.be.undefined;
    })
});


describe('Database Connection', () => {
    it('should connect to the database', async () => {
        const uri = process.env.MONGO_URI;
        const db = new MongoClient(uri);
        try {
            await db.connect();
            expect(db.topology.s.state).to.equal('connected');
        } catch (err) {
            console.log(err);
            throw new Error('Failed to connect to MongoDB');
        } finally {
            await db.close();
        }
    });
});

describe('App endpoints', () => {
    let server;

    before(() => {
        const PORT = process.env.APP_PORT_NUMBER;
        server = app.listen(PORT, () => {
            console.log(`app listening to port: ${PORT}`);
        });
    });

    afterEach(() => {
        server.close();
    })

    it('should repply with a hello world', async () => {
        const response = await request(server)
        .get('/')
        .expect('Content-Type', /text/)
        .expect(200);

        expect(response.text).to.equal('hello world');
    });
});

