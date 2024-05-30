const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const endpointsJSON = require("../endpoints.json")

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('Invalid paths', () => {
    test('status 404: returns "Route not found" message', () => {
        return request(app)
        .get("/api/invalid_path")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Not found")
        })
    });
});
describe('GET /api/topics', () => {
    test('status 200: returns an array of topic objects, each with "slug" and "description" properties', () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body}) => {
                expect(body.topics.length).toBe(3)
                body.topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                })
            })
    });
});
describe('GET /api', () => {
    test('status 200: returns a JSON object with all avilable API endpoints and their documentation', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
            const endpoints = body.endpoints
            expect(endpoints).toEqual(endpointsJSON)
        })
    });
});
describe('GET /api/articles/:article_id', () => {
    test('status 200: returns one article object filtering by article_id, which should have the following properties: author, title, article_id, body, topic, created_at, votes, article_img_url', () => { 
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {
            expect(body.article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: 1,
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            })
        })
    });
    test('status 404: returns no article found for article_id when passed an article_id which does not exist', () => {
        return request(app)
        .get("/api/articles/999999999")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("No article found for article_id: 999999999")
        })
    });
    test('status 400: returns Bad Request when passed an invalid id (not a number)', () => {
        return request(app)
        .get("/api/articles/notAnId")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        })
    });
});
describe('GET /api/articles', () => {
    test('status 200: returns an array of article objects each of which with the following properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body}) => {
            const articles = body.articles
            expect(articles).toHaveLength(13)
            expect(articles).toBeSorted({ descending: true })
            for(const property in articles){
                expect(articles[property]).not.toContainKey("body")
                expect(articles[property]).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number)
                })
            }
        })
    });
});
describe('GET /api/articles/:article_id/comments', () => {
    test('status 200: should return array of comments for the given article_id, each comment with the following properties: comment_id, votes, created_at, author, body, article_id, ordered by date descending', () => {
        return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then(({body}) => {
            const comments = body.comments
            expect(comments).toHaveLength(2)
            expect(comments).toBeSortedBy('created_at',{descending: true})
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: 9
                })
            })
        })
    });
    test('status 200: should return empty array when given an article_id with no comments', () => {
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({body}) => {
            const comments = body.comments
            expect(comments).toHaveLength(0)
        })
    });
    test('status 404: should return error message when given an article_id which doesnt exist in the articles table', () => {
        return request(app)
        .get("/api/articles/999999999/comments")
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Article Not Found")
        })
    });
});
describe('POST /api/articles/:article_id/comments', () => {
    test('status 200: should add a comment for an article when provided an object with a username and body, then return the posted comment', () => {
        const comment = {
            username: "lurker",
            body: "new comment"
        }
        return request(app)
        .post("/api/articles/9/comments")
        .send(comment)
        .expect(201)
        .then(({body}) => {
            expect(body.comment).toMatchObject({
                comment_id: expect.any(Number),
                votes: 0,
                created_at: expect.any(String),
                article_id: 9,
                author: "lurker",
                body: "new comment"
            })
        })
    });
    test('status 400: Bad Request when given malformed body {}', () => {
        const comment = {}
        return request(app)
        .post("/api/articles/9/comments")
        .send(comment)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")
        })
    });
    test('status 404: Username Not Found when given username that does not exist on the users table', () => {
        const comment = {
            username: "Eli",
            body: "new comment"
        }
        return request(app)
        .post("/api/articles/9/comments")
        .send(comment)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe("Username Not Found")
        })
    });
});