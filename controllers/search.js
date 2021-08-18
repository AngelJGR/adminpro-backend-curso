const { response } = require('express');
const User = require('../models/user')
const Hospital = require('../models/hospital')
const Doctor = require('../models/doctor')


const findAll = async (req, res = response) => {
  const keyword = req.params.keyword;
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

const findByCollection = async (req, res = response) => {
  const { collection, keyword } = req.params;
  const regex = new RegExp(keyword, 'i');
  let result = [];

  switch (collection) {
    case 'hospitals':
      result = await Hospital.find({name: regex}).populate('user', 'name img');
      break;
    case 'doctors':
      result = await Doctor.find({name: regex}).populate('user', 'name img').populate('hospital', 'name img');
      break;
    case 'users':
      result = await User.find({name: regex});
      break;
  
    default:
      return res.status(400).json({
        ok: false,
        msg: 'Collection must be an available collection'
      });
  }

  res.json({
    ok:true,
    result
  })
}

module.exports = {
  findAll,
  findByCollection
}