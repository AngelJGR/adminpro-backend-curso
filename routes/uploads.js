const { Router } = require("express");
const expressFU = require("express-fileupload");

const { fileUpload } = require('../controllers/uploads');
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.use(expressFU());

router.put('/:collection/:id', validateJwt, fileUpload);

module.exports = router;