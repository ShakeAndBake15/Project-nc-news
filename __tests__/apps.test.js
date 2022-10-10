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
        console.log(body)
        body.forEach(topic => {
            expect(topic).toEqual(expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String)
            }))
        })
    })
  })
});
