const { getArticle, getArticles, getComments, patchArticle, postComment } = require('../server/controller')
const express = require('express')
let router = express.Router();

router
  .route('/')
  .get(getArticles);

router
  .route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .post(postComment)

router
  .route('/:article_id/comments')
  .get(getComments)
  .post(postComment)

module.exports = router;