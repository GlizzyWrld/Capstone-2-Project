const testingPass = require('../testSecret')
const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const router = require('./users'); 

const app = express();
app.use(express.json());
app.use(router);

jest.mock('../models/user');
jest.mock('../models/fact');
jest.mock('../helpers/jwtUtil', () => ({
    verifyToken: jest.fn((req, res, next) => next())
}));


const User = require('../models/user');

describe('User Routes', () => {

    beforeEach(async () => {
        jest.clearAllMocks();
        await mongoose.connect(`mongodb+srv://GlizzyWrld:${testingPass}@cluster0.y27mvqu.mongodb.net/TestDb?retryWrites=true&w=majority`);
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });
    
    describe('GET /profile/:username', () => {
        it('should retrieve user profile successfully', async () => {
            User.findOne.mockResolvedValue({ username: 'testuser' });

            console.log(User.findOne()); 
            const response = await request(app).get('/profile/testuser');

            expect(response.status).toBe(200);
            expect(response.body.username).toBe('testuser');
        });

        it('should return 404 if user not found', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app).get('/profile/nonexistentuser');

            expect(response.status).toBe(404);
        });
    });


    describe('DELETE /profile/:username', () => {
        it('should delete user profile successfully', async () => {
            User.findOneAndDelete.mockResolvedValue({ username: 'testuser' });

            const response = await request(app).delete('/profile/testuser');

            expect(response.status).toBe(204);
        });
    });

    describe('GET /facts', () => {
        it('should retrieve facts successfully', async () => {
            const mockFacts = { data: ["fact1", "fact2", "fact3"] };
            
            jest.mock('axios', () => ({
                get: jest.fn().mockResolvedValue(mockFacts)
            }));

            const response = await request(app).get('/facts');

            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        });
    });
   
});