const { Router } = require("express");
const { check } = require('express-validator');

const { validate } = require('../middlewares/validators')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJwt, validateAdminRole } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/', validateJwt, getUsers);
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
    validateJwt,
    validateAdminRole,
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('role', 'Role is required').notEmpty(),
    validate
  ],
  updateUser
);

router.delete('/:id', [ validateJwt, validateAdminRole ], deleteUser);


module.exports = router;