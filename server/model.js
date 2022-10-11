const db = require('../db/connection')

exports.selectTopics = () => {
  return db.query(`SELECT * 
  FROM topics;`)
  .then((result) => {
    return result.rows;
  })
}

exports.selectArticles = (topic) => {

const validTopics = ['mitch', 'cats', 'paper', undefined]

if(!validTopics.includes(topic)){
  return Promise.reject({ status: 404, msg: 'topic not found'});
}

const queryValues = []
let queryString = `SELECT *, 
(SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) 
AS comment_count
FROM articles`

if(topic !== undefined){
  queryValues.push(topic)
  queryString += ` WHERE topic = $1`
}

queryString += ` ORDER BY created_at DESC;`

return db.query(queryString, queryValues)
.then((result) => {
  return result.rows;
});
}

exports.selectArticle = (id) => {
  
  const queryValues = []
  let queryString = `SELECT *, 
  (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) 
  AS comment_count
  FROM articles`

  if(id !== undefined){
    queryValues.push(id)
    queryString += ` WHERE article_id = $1`
  }

  return db.query(queryString, queryValues)
  .then((result) => {
    if(result.rows.length === 0){
      return Promise.reject({ status: 404, msg: 'article not found'})
    } else if(id !== undefined){
      return result.rows[0];
    } else {
      return result.rows;
    }
  });
}

exports.selectUsers = () => {
  return db.query(`SELECT * 
  FROM users;`)
  .then((result) => {
    return result.rows;
  })
}

exports.updateArticle = (inc_votes, Id) => {
  return db.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,[inc_votes, Id])
    .then((result) => {
      if(result.rows.length === 0){
        return Promise.reject({ status: 404, msg: 'article not found'})
      }
      return result.rows[0];
    })
}