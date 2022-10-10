const db = require('../db/connection')

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics;`)
  .then((result) => {
    return result.rows
  })
}
exports.selectUsers = () => {
  return db.query(`SELECT * 
  FROM users;`)
  .then((result) => {
    return result.rows;
  })
}