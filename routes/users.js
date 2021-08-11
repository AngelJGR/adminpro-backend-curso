const { Router } = require("express");
const { check } = require('express-validator');

const { validate } = require('../middlewares/validators')
const { getUsers, createUser, updateUser } = require('../controllers/users')

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
  createUser
);
router.put('/:id',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('role', 'Role is required').notEmpty(),
    validate
  ],
  updateUser
);


module.exports = router;