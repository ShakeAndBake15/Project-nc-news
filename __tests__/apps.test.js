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
      expect(users.length).toBe(4)
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
      votes: 100,
      comment_count: "11"
    }})
    })
  })
})

describe('Error handling', () => {
    it('status: 404, should respond with 404 "incorrect path" when url path is incorrect for topics', () => {
        return request(app)
        .get('/api/tropics')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Incorrect path')
        })
    })
    it('status: 404, should respond with 404 "incorrect path" when url path is incorrect for users', () => {
      return request(app)
      .get('/api/user')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Incorrect path')
      })
  })
    it('status: 404, Should return with 404 "article not found" when parametric endpoint is incorrect', () => {
      return request(app)
      .get('/api/articles/22')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('article not found')
      })
    })
    it('status 400: Should return with "Incorrect request format" when endpoint is an incorrect data-type', () => {
      return request(app)
      .get('/api/articles/banana')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect request format")
    })
  })
})
