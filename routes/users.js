const { getUsers, getUser } = require('../server/controller')
const express = require('express')
let router = express.Router();

router
  .route('/')
  .get(getUsers)

router
  .route('/:username')
  .get(getUser)

module.exports = router;