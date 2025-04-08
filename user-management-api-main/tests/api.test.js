const request = require('supertest');
const { app, users } = require('../backend/app');

describe('User API Tests', () => {
    beforeEach(() => {
        // Reset in-memory DB
        users.length = 0;
    });

    it('should create a user with valid data', async () => {
        const res = await request(app)
            .post('/users')
            .send({ 
                firstName: 'Ivan', 
                lastName: 'Horvat', 
                username: 'ivan123', 
                email: 'ivan@example.com', 
                password: 'Secure@123' 
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe('ivan123');
    });

    it('should retrieve an existing user', async () => {
        const userRes = await request(app).post('/users').send({ 
            firstName: 'Marko', 
            lastName: 'Novak', 
            username: 'marko123', 
            email: 'marko@example.com', 
            password: 'Test@1234' 
        });

        const userId = userRes.body.id;
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe('marko123');
    });

    it('should return 404 for a non-existing user', async () => {
        const res = await request(app).get('/users/99');
        expect(res.statusCode).toBe(404);
    });

    // Invalid first name
    it('should return an error for invalid first name', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                firstName: '',
                lastName: 'Horvat',
                username: 'ivan123',
                email: 'ivan@example.com',
                password: 'Secure@123'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('First name and last name must be between 3 and 50 characters.');
    });
    

    // Invalid email
    it('should return an error for invalid email', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                firstName: 'Ivan',
                lastName: 'Horvat',
                username: 'ivan123',
                email: 'ivan@invalid',
                password: 'Secure@123'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid email format.');
    });


    // Invalid password
    it('should return an error for invalid password', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                firstName: 'Ivan',
                lastName: 'Horvat',
                username: 'ivan123',
                email: 'ivan@example.com',
                password: 'short'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Password must be at least 8 characters long, contain one uppercase letter, and one special character.');
    });
    

    it('should return 404 for a non-existing user', async () => {
        const res = await request(app).get('/users/99');
        expect(res.statusCode).toBe(404);
    });

});
