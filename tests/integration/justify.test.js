const request = require('supertest');
let server;

describe('/api/justify', () => {
    beforeEach(() => { server = require('../../server');})
    afterEach (() => { server.close();})

    describe('Authentication middleware', () => {
    it('should return 401 if user is not authenticated', async () => {
        const response = await request(server)
            .post('/api/justify')
            .send('TEXT');

        expect(response.status).toBe(401);
    });

    it('should return 401 if there are invalid token', async () => {
        const response = await request(server)
            .post('/api/justify')
            .set('x-auth-token', 'token')
            .send('TEXT');

        expect(response.status).toBe(401);
    });
    })

    it('should return 201 if token is valid', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWVkaXNoQHRpY3RhY3RyaXAuY29tIiwiaWF0IjoxNjAzODQyNDk3fQ.GZ26PdWohhkb5uf-F2jlWIuvIqHvrW51z6FSItWNVLo';
        const response = await request(server)
            .post('/api/justify')
            .set('x-auth-token', token)
            .type('text/plain')
            .send('TEXT');

        expect(response.status).toBe(201);
    })

    describe('Check rating middleware', () => {
        it('should return 406 if the format of request if invalid', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWVkaXNoQHRpY3RhY3RyaXAuY29tIiwiaWF0IjoxNjAzODQyNDk3fQ.GZ26PdWohhkb5uf-F2jlWIuvIqHvrW51z6FSItWNVLo';
            const response = await request(server)
            .post('/api/justify')
            .set('x-auth-token', token)
            .send({test : "test"});

            expect(response.status).toBe(406);
        })
        
        it('should return 402 if the user exceeded the limit of words', async () => {
            // tested with rate_limit_words = 40
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWVkaXNoQHRpY3RhY3RyaXAuY29tIiwiaWF0IjoxNjAzODQyNDk3fQ.GZ26PdWohhkb5uf-F2jlWIuvIqHvrW51z6FSItWNVLo';
            const response = await request(server)
                .post('/api/justify')
                .set('x-auth-token', token)
                .type('text/plain')
                .send('TEXT '.repeat(40));
    
            expect(response.status).toBe(402);
        })
    })
})

