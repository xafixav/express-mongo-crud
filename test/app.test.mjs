import { expect } from 'chai';
import { MongoClient } from 'mongodb';


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

