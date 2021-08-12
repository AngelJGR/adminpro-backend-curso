const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validators');

const router = Router();

router.post('/',[
  check('email', 'Email is required').notEmpty(),
  check('email', 'Email format is invalid').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validate
], login);



module.exports = router;