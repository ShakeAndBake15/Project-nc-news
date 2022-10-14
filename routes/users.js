const { getUsers } = require('../server/controller')
const express = require('express')
let router = express.Router();

router
  .route('/')
  .get(getUsers)

module.exports = router;