const express = require('express');
const { getTopics, getUsers } = require('./controller');


const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/users', getUsers)

app.use((req, res, next) => {
  res.status(404).send({ msg: 'Incorrect path'})
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  });

module.exports = app;