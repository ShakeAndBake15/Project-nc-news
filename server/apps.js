const express = require('express');


const app = express();
app.use(express.json());
const articles = require('../routes/articles')
const comments = require('../routes/comments')
const topics = require('../routes/topics')
const users = require('../routes/users')

app.use("/api/articles", articles)
app.use("/api/comments", comments)
app.use("/api/topics", topics)
app.use("/api/users", users)

app.use((err, req, res, next) => {
  if(err.status && err.msg){
    res.status(err.status).send({ msg : err.msg })
  } else{
    next(err)
  }
});

app.use((err, req, res, next) => {
  if(err.code === "23503") {
    res.status(404).send({msg: 'no user found'})
  } else {
    next(err);
  }
})

app.use((err, req, res, next) => {
  if(err.code === "22P02") {
    res.status(400).send({msg: 'Incorrect request format'})
  } else {
    next(err);
  }
})

app.use((req, res, next) => {
  res.status(404).send({ msg: 'Incorrect path'})
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  });

module.exports = app;