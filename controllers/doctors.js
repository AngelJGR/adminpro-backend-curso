const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get Doctors'
  })
}

const createDoctor = async (req, res = response) => {
  const doctor = new Doctor({
    user: req.uid,
    ...req.body
  });

  try {
    const doctorDB = await doctor.save();
    res.json({
      ok: true,
      doctor: doctorDB
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  }
}

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Update Doctor'
  })
}

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Delete Doctor'
  })
}

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
}