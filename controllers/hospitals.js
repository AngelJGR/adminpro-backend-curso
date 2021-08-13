const { response } = require('express');

const getHospitals = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get Hospitales'
  })
}

const createHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Create'
  })
}

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Update'
  })
}

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Delete'
  })
}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}