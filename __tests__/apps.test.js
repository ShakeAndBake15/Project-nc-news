const app = require('../server/apps');
const request = require('supertest');
const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
require('jest-sorted')

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

describe('GET /api/articles', () => {
  it('Status: 200, should respond with all articles and thier values', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({ body }) => {
        const { articles } = body
        expect(articles.length).toBe(12)
        expect(articles).toBeSorted("created_at", { descending: true })
        articles.forEach(article => {
            expect(article).toEqual(expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String)
            }))
        })
    })
  })
  it('Status 200: Should respond correctly with topics queries', () => {
    return request(app)
    .get('/api/articles?topic=mitch')
    .expect(200)
    .then(({ body }) => {
      const { articles } = body
      expect(articles.length).toBe(11)
      articles.forEach(article => {
      expect(article).toEqual(expect.objectContaining({
        article_id: expect.any(Number),
        title: expect.any(String),
        topic: 'mitch',
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(String)
        }))
      })
    })
  })
})

describe('GET /api/articles/:article_id', () => {
  it('Status: 200, Should respond with the correct article specified by the user', () => {
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

describe('GET /api/articles/:article_id/comments', () => {
  it('status 200: should return all the comments for a given article and their values', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({ body }) => {
      const { comments } = body
      expect(comments.length).toBe(11)
      expect(comments).toBeSorted("created_at", { descending: true })
      comments.forEach(comment => expect.objectContaining({
        comment_id: expect.any(Number),
        votes: expect.any(Number),
        created_at: expect.any(String),
        author: expect.any(String),
        body: expect.any(String)
      }))
    })
  })
  it('status 200: Should return with "there are no comments yet" when an article has no comments', () => {
    return request(app)
    .get('/api/articles/4/comments')
    .expect(200)
    .then(({ body }) => {
    const { comments } = body
    expect(comments).toBe('there are no comments yet')
    })
  })
})

describe('PATCH /api/articles/:article_id', () => {
  it('status 201, Should patch the articles vote count by the specified amount', () => {
    const newVote = { inc_votes: 2 }
    return request(app)
    .patch('/api/articles/2')
    .send(newVote)
    .expect(201)
    .then(({ body }) => {
      expect(body.votes).toBe(2)
    })
  })
})

describe('POST /api/articles/:article_id/comments', () => {
  it('status: 201, Should post a new comment to the correct article', () => {
    const newComment = { 
      username: "icellusedkars",
      body: "I am a comment"}
      return request(app)
      .post('/api/articles/1/comments')
      .send(newComment)
      .then(({ body }) => {
        expect(body).toEqual({
          article_id: 1, 
          author: "icellusedkars",
          body: "I am a comment",
          comment_id: 19,
          votes: 0,
          created_at: expect.any(String)})
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
  it('status: 404, should respond with 404 "incorrect path" when url path is incorrect for articles', () => {
    return request(app)
    .get('/api/aticles')
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
    it('status: 404, Should return with 404 "topic not found" when query endpoint is incorrect', () => {
      return request(app)
      .get('/api/articles?topic=dave')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('topic not found')
      })
    })
    it('status 404: Should return with "article not found" when when parametric endpoint is incorrect when patching', () => {
      const newVote = { inc_votes: 2 }
      return request(app)
      .patch('/api/articles/54')
      .send(newVote)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('article not found')
      })
    })
    it('Status 404: Should retrun with "article not found" when given an incorrect endpoint for vewing comments', () => {
      return request(app)
      .get('/api/articles/54/comments')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('article not found')
      })
    })
    it('Status 404: Should retrun with "article not found" when given an incorrect endpoint for posting comments', () => {
      return request(app)
      .post('/api/articles/54/comments')
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
  it('status 400: Should return with "Incorrect request format" when endpoint is an incorrect data-type when patching', () => {
    const newVote = { inc_votes: 2 }
    return request(app)
    .patch('/api/articles/fiftyFour')
    .send(newVote)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('Incorrect request format')
    })
  })
})
