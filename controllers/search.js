const { response } = require('express');
const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')


const findAll = async (req, res = response) => {
  const keyword = req.params.all;
  const regex = new RegExp(keyword, 'i');

  const [ users, hospitals, doctors ] = await Promise.all([
    User.find({name: regex}),
    Hospital.find({name: regex}),
    Doctor.find({name: regex})
  ])
  res.json({
    ok:true,
    users,
    hospitals,
    doctors
  })
}

module.exports = {
  findAll
}