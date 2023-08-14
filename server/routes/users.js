var express = require('express');
var router = express.Router();
const User = require('../models/users');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find();

  console.log('reached')
  console.log(users);
  res.status(200).json({ users })
});

module.exports = router;
