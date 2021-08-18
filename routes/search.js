const { Router } = require("express");
// const { check } = require('express-validator');

// const { validate } = require('../middlewares/validators');
const { findAll } = require('../controllers/search');
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/:all', validateJwt, findAll);

module.exports = router;