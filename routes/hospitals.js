const { Router } = require("express");
const { check } = require('express-validator');

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');
const { validateJwt } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/', getHospitals);
router.post('/',
  //[],
  createHospital
);
router.put('/:id',
  //[],
  updateHospital
);
router.delete('/:id', deleteHospital);

module.exports = router;