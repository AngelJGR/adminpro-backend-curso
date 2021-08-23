const { Router } = require("express");
const expressFU = require("express-fileupload");

const { fileUpload, getImage } = require('../controllers/uploads');
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.use(expressFU());

router.put('/:collection/:id', validateJwt, fileUpload);
router.get('/:collection/:img', validateJwt, getImage);

module.exports = router;