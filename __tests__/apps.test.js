const app = require('../server/apps');
const request = require('supertest');
const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe('GET /api/topics',() => {
  it('Status: 200, Should respond with an array conatianing both the descriptions and the "slugs"', () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({ body }) => {
        const { topics } = body
        expect(topics.length).toBe(3)
        topics.forEach(topic => {
            expect(topic).toEqual(expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String)
            }))
        })
    })
  })
});

describe('Error handeling', () => {
    it('stats 404, should respond with 404 "incorrect path" when url path is incorrect', () => {
        return request(app)
        .get('/api/tropics')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Incorrect path')
        })
    })
})
