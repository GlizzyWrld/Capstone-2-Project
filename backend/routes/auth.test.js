const testingPass = require('../testSecret')
const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const router = require('./auth'); 

const app = express();
app.use(express.json());
app.use(router);

jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('../helpers/jwtUtil', () => ({
    generateToken: jest.fn().mockReturnValue('fakeToken')
  }));
const User = require('../models/user');
const bcrypt = require('bcryptjs');


describe('User Routes', () => {

    beforeAll(async () => {
        // connect to test database
        await mongoose.connect(`mongodb+srv://GlizzyWrld:${testingPass}@cluster0.y27mvqu.mongodb.net/TestDb?retryWrites=true&w=majority`)
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });
    
    describe('POST /users', () => {
        it('should register a user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({ username: 'testuser2', password: 'testpass', email: 'test@aol.com'});

            const response = await request(app)
                .post('/users')
                .send({ username: 'testuser2', password: 'testpass', email: 'test@aol.com' });

            expect(response.status).toBe(201);
            expect(response.body.username).toBe('testuser2');
            expect(response.body.auth).toBe(true);
            expect(response.body.token).toBeDefined();
        });

        it('should not register a user with an existing username', async () => {
            User.findOne.mockResolvedValue({ username: 'testuser2' });

            const response = await request(app)
                .post('/users')
                .send({ username: 'testuser2', password: 'testpass' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username already registered');
        });

    });

    describe('POST /login', () => {
        it('should login successfully', async () => {
            User.findOne.mockResolvedValue({ username: 'testuser2', password: 'hashed_password' });
            bcrypt.compare.mockResolvedValue(true); 

            const response = await request(app)
                .post('/login')
                .send({ username: 'testuser2', password: 'testpass' });

            expect(response.status).toBe(200);
            expect(response.body.username).toBe('testuser2');
            expect(response.body.auth).toBe(true);
            expect(response.body.token).toBeDefined();
        });

        it('should not login with a non-existing username', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/login')
                .send({ username: 'wronguser', password: 'testpass' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('user not found');
        });

        it('should not login with a wrong password', async () => {
            User.findOne.mockResolvedValue({ username: 'testuser2', password: 'hashed_password' });
            bcrypt.compare.mockResolvedValue(false);

            const response = await request(app)
                .post('/login')
                .send({ username: 'testuser2', password: 'wrongpass' });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('password does not match');
        });

    });
});
