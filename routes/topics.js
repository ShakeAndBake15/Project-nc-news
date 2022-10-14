const { getTopics } = require('../server/controller')
const express = require('express')
let router = express.Router();

router
  .route('/')
  .get(getTopics)

  module.exports = router;

