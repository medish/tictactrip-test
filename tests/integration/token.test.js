const request = require('supertest');
let server;

describe('/api/token', () => {
    beforeEach(() => { server = require('../../server');})
    afterEach (() => { server.close();})

    describe('Check rating middleware', () => {
        it('should return 400 if no user found', async () => {
            const response = await request(server)
            .post('/api/token')
            .send({});

            expect(response.status).toBe(400);
        })
        
        it('should return token if a user is found', async () => {
            const response = await request(server)
            .post('/api/token')
            .send({mail : "medish@test.com"});

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        })
    })
})

