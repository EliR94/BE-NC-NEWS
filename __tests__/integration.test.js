const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

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
            for(const property in endpoints){
                expect(endpoints[property]).toMatchObject({
                    description: expect.any(String)
                })
            }
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
    // 
});