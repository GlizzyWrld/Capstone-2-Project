process.env.SECRET_KEY = 'test_secret';
const jwt = require('jsonwebtoken');
const jwtUtil = require('./jwtUtil');

jest.mock('jsonwebtoken');

describe('jwtUtil', () => {

    afterEach(() => {
        // clear mocks after each test
        jest.clearAllMocks();
    });

    describe('generateToken', () => {
        it('should generate a valid JWT for a user', () => {
            jwt.sign.mockReturnValue('dummy_token');

            const user = { username: 'testuser' };
            const token = jwtUtil.generateToken(user);

            // Assert that jwt.sign was called with correct arguments
            expect(jwt.sign).toHaveBeenCalledWith({ username: user.username }, 'test_secret', { expiresIn: 3600 });

            expect(token).toBe('dummy_token');
        });
    });

    describe('verifyToken', () => {
        it('should decode a valid token', () => {
            const req = {
                headers: {
                    'x-access-token': 'valid_token'
                }
            };
            const res = {};
            const next = jest.fn();

            jwt.verify.mockImplementation((token, secret, callback) => callback(null, { id: 123 }));

            jwtUtil.verifyToken(req, res, next);

            expect(req.userId).toBe(123);
            expect(next).toHaveBeenCalled();
        });

        it('should return 403 if no token is provided', () => {
            const req = {headers: {}};
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('verification error'), null));

            jwtUtil.verifyToken(req, res, () => {});

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith({auth: false, message: 'No token provided'});
        });
    });
});