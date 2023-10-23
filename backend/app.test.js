const request = require('supertest');
const app = require('./app');

jest.mock('./routes/auth', () => (req, res, next) => {
    res.send('mockAuthRoute');
});

jest.mock('./routes/users', () => (req, res, next) => {
    res.send('mockUsersRoute');
});

jest.mock('./helpers/jwtUtil', () => ({
    verifyToken: jest.fn((req, res, next) => next())
}));

describe('App Routes', () => {
    describe('GET /auth', () => {
        it('should hit the mock auth route', async () => {
            const response = await request(app).get('/auth');
            expect(response.text).toBe('mockAuthRoute');
            expect(response.status).toBe(200);
        });
    });

    describe('GET /users', () => {
        it('should hit the mock users route', async () => {
            const response = await request(app).get('/users');
            expect(response.text).toBe('mockUsersRoute');
            expect(response.status).toBe(200);
        });
    });
});
