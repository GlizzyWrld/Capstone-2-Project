const testingPass = require('../testSecret')
const mongoose = require('mongoose');
const User = require('./user');

describe('User Model Test', () => {
    beforeAll(async () => {
        // connect to test database
        mongoose.connect(`mongodb+srv://GlizzyWrld:${testingPass}@cluster0.y27mvqu.mongodb.net/TestDb?retryWrites=true&w=majority`)
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('create & save user successfully', async () => {
        const validUser = new User({
            username: 'testuser',
            password: 'testpassword',
            email: 'testemail@aol.com'
        });
        const savedUser = await validUser.save();
        expect(savedUser.username).toBe(validUser.username);
        expect(savedUser.password).toBe(validUser.password);
        expect(savedUser.email).toBe(validUser.email);
    }, 10000);
})