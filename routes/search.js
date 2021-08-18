const { Router } = require("express");
// const { check } = require('express-validator');

// const { validate } = require('../middlewares/validators');
const { findAll, findByCollection } = require('../controllers/search');
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/:keyword', validateJwt, findAll);
router.get('/collection/:collection/:keyword', validateJwt, findByCollection);

module.exports = router;