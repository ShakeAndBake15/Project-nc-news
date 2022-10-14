# Northcoders News API

## Link to the hosted api

https://al-nc-news.herokuapp.com/api/:endpoint

(Please note, due to changes with the PaaS, this will no longer be availble from 28/11/2022)

## NC news

NC news is to be fully functional site, that allows users to read articles, comments, and update, post and delete comments on those articles as well. The backend of this project has been writeen entirely using Node.js and ustilises Express, Postgres SQL and Superstest and Jest for test suites. For navigating the site and viewing different content, please see endpoints.json for all possible endpoints, quieris and parameters. The frontend of this project is due to be completed using React.js and is due for completion by mid-Novemeber 2022.

## Dev instructions

npm library (CLI: npm init)
Post-gres (CLI: npm install pg)
pg-format (CLI: npm install pg-format)
dotenv (CLI: npm install dotenv --save)
express (CLI: npm install express)
husky (CLI: npm install husky --save-dev)
jest (CLI: npm install jest -d)
jest-sorted (CLI: npm install jest-sorted -d)
supertest (CLI: npm install supertest -d)

Cloning - To clone this repo, please do so on github via -> https://github.com/ShakeAndBake15/Project-nc-news -> code -> copy the link - > and then on your CLI once in the correct folder $ git clone *paste link*

Testing - Once jest, jest-sorted and supertest dependancies have been installed run $ npm test, or $ npm test *test suite name* to run testing operations.

Seeding - to seed the databases, please run $ npm run seed

## Versions needed

Postgres - 8.8.0

node.js - v18.7.0

## Husky

To ensure we are not commiting broken code this project makes use of git hooks. Git hooks are scripts triggered during certain events in the git lifecycle. Husky is a popular package which allows us to set up and maintain these scripts. This project makes use a _pre-commit hook_. When we attempt to commit our work, the script defined in the `pre-commit` file will run. If any of our tests fail than the commit will be aborted.

## Connencting to both databases

In order to connect with both databases locally, a .evn. file must be added for both the test and development databases. Within these files you must add PGDATABASE=nc_news_test to the .eve.test file and PGDATABASE=nc_news to the development file. Please not that these will be gitignored and therefore cannot be pulled.