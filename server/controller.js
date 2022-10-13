
const { selectTopics, selectUsers, selectArticle, selectComments, selectArticles, checkTopic, updateArticle, insertComment, removeComment } = require('./model')


exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics });
    }).catch(next);
}

exports.getUsers = (req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users });
    }).catch(next);
}

exports.getArticles =  (req, res, next) => {
  const { topic } = req.query
  const { sort_by } = req.query
  const { order } = req.query
  const promises = [selectArticles(topic, sort_by, order)]
  if(topic){
    promises.push(checkTopic(topic))
  }
  Promise.all(promises).then((result) => {
    res.status(200).send({ articles: result[0] });
  }).catch(err => {
    next(err);
  });
}

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params
  selectArticle(article_id).then((article) => {
    res.status(200).send({ article });
  }).catch(next);
}

exports.getComments = (req, res, next) => {
  const { article_id } = req.params
  selectArticle(article_id).then(() => { 
  selectComments(article_id).then((comments) => {
    res.status(200).send({ comments });
    })
  }).catch(next);
}

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params
  const { inc_votes } = req.body
  updateArticle(inc_votes, article_id).then((body) => {
    res.status(201).send(body);
  }).catch(next);
}

exports.postComment = (req, res, next) => {
  const { article_id } = req.params
  const newComment = req.body
  selectArticle(article_id).then(() => {
  return insertComment(article_id, newComment)
  }).then((result) => {
    res.status(201).send(result);
  }).catch(next);
}

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params
  removeComment(comment_id).then(() => {
    res.status(204).end()
  }).catch(next);
}