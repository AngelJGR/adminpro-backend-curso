const { Router } = require("express");
const { check } = require('express-validator');

const { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctorById } = require('../controllers/doctors');
const { validateJwt } = require("../middlewares/validate-jwt");
const { validate } = require('../middlewares/validators')

const router = Router();

router.get('/', validateJwt, getDoctors);
router.get('/:id', validateJwt, getDoctorById);
router.post('/',
  [
    validateJwt,
    check('name', 'Doctor name is required').notEmpty(),
    check('hospital', 'Hospital is required').notEmpty(),
    check('hospital', 'Hospital id must be valid').isMongoId(),
    validate
  ],
  createDoctor
);
router.put('/:id',
  [
    validateJwt,
    check('name', 'Doctor name is required').notEmpty(),
    check('hospital', 'Hospital is required').notEmpty(),
    check('hospital', 'Hospital id must be valid').isMongoId(),
    validate
  ],
  updateDoctor
);
router.delete('/:id', validateJwt, deleteDoctor);

module.exports = router;