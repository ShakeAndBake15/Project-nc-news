const { selectTopics, selectUsers, selectArticle, updateArticle } = require('./model')

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

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params
  selectArticle(article_id).then((article) => {
    res.status(200).send({ article });
  }).catch(next);
}

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params
  const { inc_votes } = req.body
  updateArticle(inc_votes, article_id).then((body) => {
    res.status(201).send(body);
  }).catch(next);
}