const { Router } = require("express");
const { check } = require('express-validator');

const { validate } = require('../middlewares/validators')
const { getUsers, createUser } = require('../controllers/users')

const router = Router();

router.get('/', getUsers);
router.post('/',
  [
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Invalid email format').isEmail(),
    validate
  ],
  createUser);


module.exports = router;