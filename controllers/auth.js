const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found'
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password doesnt match'
      });
    }

    res.json({
      ok: true,
      msg: 'Login successfully'
    })

  } catch(error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error del servidor'
    });
  }
}

module.exports = {
  login
}