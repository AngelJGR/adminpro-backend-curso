const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validators');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
  [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email format is invalid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validate
  ], 
  login
);

router.post('/google',
  [
    check('token', 'Google id token is required').notEmpty(),
    validate
  ], 
  googleSignIn
);

router.get('/renew', validateJwt, renewToken);

module.exports = router;