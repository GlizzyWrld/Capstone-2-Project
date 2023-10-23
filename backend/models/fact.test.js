const testingPass = require('../testSecret')
const mongoose = require('mongoose');
const Fact = require('./fact');

describe('Fact Model Test', () => {
    beforeAll(async () => {
        // connect to test database
        mongoose.connect(`mongodb+srv://GlizzyWrld:${testingPass}@cluster0.y27mvqu.mongodb.net/TestDb?retryWrites=true&w=majority`)
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('create & save fact successfully', async () => {
        const validFact = new Fact({
            username: 'testuser',
            fact: 'This is a test fact'
        });
        const savedFact = await validFact.save();
        expect(savedFact._id).toBeDefined();
        expect(savedFact.username).toBe(validFact.username);
        expect(savedFact.fact).toBe(validFact.fact);
    }, 10000);
})