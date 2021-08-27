const { Router } = require("express");
const { check } = require('express-validator');

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');
const { validateJwt } = require("../middlewares/validate-jwt");
const { validate } = require('../middlewares/validators')

const router = Router();

router.get('/', getHospitals);
router.post('/',
  [
    validateJwt,
    check('name', 'Hospital name is required').notEmpty(),
    validate
  ],
  createHospital
);
router.put('/:id',
  [
    validateJwt,
    check('name', 'Hospital name is required').notEmpty(),
    validate
  ],
  updateHospital
);
router.delete('/:id', validateJwt, deleteHospital);

module.exports = router;