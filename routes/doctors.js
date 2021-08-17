const { Router } = require("express");
const { check } = require('express-validator');

const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors');
const { validateJwt } = require("../middlewares/validate-jwt");
const { validate } = require('../middlewares/validators')

const router = Router();

router.get('/', getDoctors);
router.post('/',
  [
    validateJwt,
    check('name', 'Doctor name is required').notEmpty(),
    check('hospital', 'Hospital is required').notEmpty(),
    validate
  ],
  createDoctor
);
router.put('/:id',
  //[],
  updateDoctor
);
router.delete('/:id', deleteDoctor);

module.exports = router;