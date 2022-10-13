const db = require('../db/connection')

exports.selectTopics = () => {
  return db.query(`SELECT * 
  FROM topics;`)
  .then((result) => {
    return result.rows;
  })
}

exports.checkTopic = (query) => {
  return db.query(`SELECT slug FROM topics WHERE slug = $1`, [query])
  .then((results) => {
    if(results.rows.length === 0){
      return Promise.reject({ status: 404, msg: 'topic not found' })
    } else {
      return;
    }
  })
}

exports.selectArticles = (topic) => {

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

  let queryString = `SELECT *, 
  (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) 
  AS comment_count
  FROM articles
  WHERE article_id = $1`

  return db.query(queryString, [id])
  .then((result) => {
    if(result.rows.length === 0){
      return Promise.reject({ status: 404, msg: 'article not found'});
    } else {
    return result.rows[0];
    }
  });
}

exports.selectComments = (id) => {

  return db.query(`SELECT *
  FROM comments
  WHERE article_id = $1
  ORDER BY created_at DESC;`, [id])
  .then((result) => {
  if(result.rows.length === 0){
    return 'there are no comments yet';
  } else {
  return result.rows;
  }
  })
}

exports.selectUsers = () => {
  return db.query(`SELECT * 
  FROM users;`)
  .then((result) => {
    return result.rows;
  })
}

exports.updateArticle = (inc_votes, id) => {
  return db.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`,[inc_votes, id])
    .then((result) => {
      if(result.rows.length === 0){
        return Promise.reject({ status: 404, msg: 'article not found'})
      }
      return result.rows[0];
    })
}

exports.insertComment = (id, newComment) => {
  const { username, body } = newComment;

  if(username !== undefined && body !== undefined){
  return db.query(
    `INSERT INTO comments
      (author, body, article_id)
    VALUES
      ($1, $2, $3)
    RETURNING *;`, [username, body, id])
    .then((result) => {
      return result.rows[0];
    })
  } else {
    return Promise.reject({ status: 400, msg: 'field required'});
  }
}

exports.removeComment = (id) => {
  return db.query(
    `DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;`
    , [id])
    .then(({ rows: [comment] }) => {
      if(comment === undefined){
        return Promise.reject({ status: 404, msg: 'comment not found'})
      }
      return comment;
    })
}