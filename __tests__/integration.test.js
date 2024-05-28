const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => {
    console.log("seeding...");
    return seed(testData);
})
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
                expect(body.length).toBe(3)
                body.forEach((topic) => {
                    expect(topic).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                })
            })
    });
});
