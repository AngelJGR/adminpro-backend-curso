const { response } = require('express');

const getDoctors = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get Doctors'
  })
}

const createDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Create Doctor'
  })
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