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

describe('GET /api/articles/:article_id', () => {
  it('Status: 200, Should respond with the correct artlice specified by the user', () => {
  return request(app)
  .get('/api/articles/1')
  .expect(200)
  .then(({ body }) => {
    expect(body).toEqual({ article: {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100
    }})
    })
  })
})

describe('Error handling', () => {
    it('status: 404, should respond with 404 "incorrect path" when url path is incorrect', () => {
        return request(app)
        .get('/api/tropics')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Incorrect path')
        })
    })
    it('status: 404, Should return with 404 "incorrect path" when parametric endpoint is incorrect', () => {
      return request(app)
      .get('/api/articles/22')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Incorrect path')
      })
    })
})
