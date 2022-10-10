const express = require('express');
const { getTopics, getArticle } = require('./controller');
const { getTopics } = require('./controller');


const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle)

app.use((err, req, res, next) => {
  if(err.status && err.msg){
    res.status(err.status).send({ msg : err.msg })
  } else{
    next(err)
  }
});

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