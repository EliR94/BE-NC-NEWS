# Northcoders News API Instructions

## To use this API: 
* https://nc-news-ms3a.onrender.com
* Endpoint: /api will return a JSON with all of the available API endpoints, descriptions and example responses
* Please be patient for API requests as hosting instance will spin down with inactivity, which can delay requests by 50 seconds or more
* Please do let me know if you find any areas of improvement I am very happy to receive feedback

## Project summary:
* This is a backend project creating an API which queries a database with users, news articles and comments
* Created as part of my Northcoders 13 week software development bootcamp journey using skills learnt over the first 6 weeks
* Was initially completed in 4 days - however I will be refactoring some already known improvements in the coming weeks
* This API will also be used from a front end project I will complete further along my Northcoders journey

## To clone and run this project locally you must:
1. Clone this repo using command `git clone https://github.com/EliR94/BE-NC-NEWS.git`
2. Create .env.test and .env.development files within the project root directory
3. Add `PGDATABASE=<insert-database-name-here>` into each .env. file ensuring to use the correct database name for each test and development database in the appropriate file 
4. Ensure .env.* files are included in .gitignore
5. Run `npm i` in your terminal to install all of the required npm dependencies for this project
6. Run `npm run seed` to seed the development database
7. Run `npm test` to run all tests for both the API "integration.tests.js" and utility functions "utils.test.js"
    * or `npm test integration` to run only the API tests and seed the test database
    * or `npm test utils` to run only the utility functions
8. You will require: `Node.js v18.17.0` and `Postgres 16.3` with these versions as minimum requirements

--- 
This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
