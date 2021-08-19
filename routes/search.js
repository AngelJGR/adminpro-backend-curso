const { Router } = require("express");

const { findAll, findByCollection } = require('../controllers/search');
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/:keyword', validateJwt, findAll);
router.get('/collection/:collection/:keyword', validateJwt, findByCollection);

module.exports = router;