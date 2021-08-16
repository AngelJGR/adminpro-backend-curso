const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'get Hospitales'
  })
}

const createHospital = async (req, res = response) => {

  const hospital = new Hospital({
    user: req.uid,
    ...req.body
  });

  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
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