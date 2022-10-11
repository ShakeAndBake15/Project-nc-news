const express = require('express');
const { getTopics, getUsers, getArticle, getArticles, patchArticle } = require('./controller');


const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/users', getUsers)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticle)
app.patch('/api/articles/:article_id', patchArticle)

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