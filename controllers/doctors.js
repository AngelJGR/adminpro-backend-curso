const { response } = require('express');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getDoctors = async (req, res = response) => {

  const doctors = await Doctor.find().populate('user', 'name email').populate('hospital', 'name');

  res.json({
    ok: true,
    doctors
  })
}

const getDoctorById = async (req, res = response) => {

  try {
    const doctor = await Doctor.findById(req.params.id).populate('user', 'name email').populate('hospital', 'name');
    res.json({
      ok: true,
      doctor
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Error getting doctor'
    })
  }
  
}

const createDoctor = async (req, res = response) => {
  const doctor = new Doctor({
    user: req.uid,
    ...req.body
  });

  try {
    const hospitalDB = await Hospital.findById(req.body.hospital);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital not found'
      });
    }

    const doctorDB = await doctor.save();
    res.json({
      ok: true,
      doctor: doctorDB
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
}

const updateDoctor = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;

  try {
    const doctorDB = await Doctor.findById(id);

    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Doctor not found'
      });
    }

    const hospitalDB = await Hospital.findById(req.body.hospital);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital not found'
      });
    }

    const doctorNewData = {
      ...req.body,
      user: uid
    }

    const doctorUpdated = await Doctor.findByIdAndUpdate(id, doctorNewData, { new: true });

    res.json({
      ok: true,
      doctor: doctorUpdated
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
}

const deleteDoctor = async (req, res = response) => {
  
  const { id } = req.params;
  try {
    const doctorDB = await Doctor.findById(id);
    if (!doctorDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Doctor not found'
      });
    }

    await Doctor.findByIdAndDelete( id );

    res.json({
      ok: true,
      msg: 'Doctor deleted!'
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
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
}