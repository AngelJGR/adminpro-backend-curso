const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email role google');
  res.json({
    ok: true,
    users
  })
}

const createUser = async (req, res = response) => {

  try {
    const { name, password, email } = req.body;

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: 'Email exist'
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );
    await user.save();

    res.json({
      ok: true,
      user
    });
  } catch(error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  }
}

module.exports = { getUsers, createUser };