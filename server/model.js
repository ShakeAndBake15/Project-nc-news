const db = require('../db/connection')

exports.selectTopics = () => {
  return db.query(`SELECT * 
  FROM topics;`)
  .then((result) => {
    return result.rows;
  })
}

exports.selectArticle = (Id) => {
  return db.query(`SELECT * 
  FROM articles
  WHERE article_id = $1`, [Id])
  .then((result) => {
    if(result.rows.length === 0){
      return Promise.reject({ status: 404, msg: 'article not found'})
    }
    return result.rows[0];
  })
}