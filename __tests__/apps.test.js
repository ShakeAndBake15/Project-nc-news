const app = require('../server/apps');
const request = require('supertest');
const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe('GET /api/topics',() => {
  it('Status: 200, Should respond with an array containing both the descriptions and the "slugs"', () => {
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

describe('GET /api/users', () => {
  it('Status 200: Should repsond with an array containing all users and their data', () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({ body }) => {
      const { users } = body
      expect(users.length === 4)
      users.forEach(user => {
        expect(user).toEqual(expect.objectContaining({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        }))
      })
    })
  })
})

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
