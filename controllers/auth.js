const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
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

const googleSignIn = async (req, res = response) => {

  const googleToken = req.body.token;

  try {

    const { name, email, picture } = await googleVerify(googleToken);

    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name, email,
        img: picture,
        password: '###',
        google: true

      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();
    const token = await generateJWT( user.id );

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Invalid google token'
    });
  }
};

module.exports = {
  login,
  googleSignIn
}