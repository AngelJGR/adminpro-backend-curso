const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {

  const hospitals = await Hospital.find().populate('user', 'name email');

  res.json({
    ok: true,
    hospitals
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

const updateHospital = async (req, res = response) => {

  const { id } = req.params;
  const uid = req.uid;
  try {

    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital not found'
      });
    }

    const hospitalNewData = {
      ...req.body,
      user: uid
    }

    const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalNewData, { new: true });

    res.json({
      ok: true,
      hospital: hospitalUpdated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
};

const deleteHospital = async (req, res = response) => {

  const { id } = req.params;
  try {
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital not found'
      });
    }

    await Hospital.findByIdAndDelete( id );
    
    res.json({
      ok: true,
      msg: 'Hospital deleted!'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}