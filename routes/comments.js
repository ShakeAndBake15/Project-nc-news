const { deleteComment } = require('../server/controller')
const express = require('express')
let router = express.Router();

router
  .route('/:comment_id')
  .delete(deleteComment)

module.exports = router;