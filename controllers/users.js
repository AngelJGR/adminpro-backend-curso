const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [users, totalUsers] = await Promise.all([
    User
      .find({}, 'name email role google img')
      .skip(from)
      .limit(5),
    User.countDocuments()
  ]);
  
  res.json({
    ok: true,
    users,
    totalUsers
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
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token,
      user
    });
  } catch(error) {
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    })
  }
}

const updateUser = async (req, res = response) => {
  const uid = req.params.id;
  try {

    const userDB = await User.findById( uid );
    if ( !userDB ) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found'
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          msg: 'Email exists'
        });
      }
    }

    if (!userDB.google) {
      fields.email = email;
    } else if (userDB.email !== email) {
      res.status(400).json({
        ok: false,
        msg: 'Google users can\'n change their emails'
      });
    }

    const updatedUser = await User.findByIdAndUpdate( uid, fields, { new: true } );

    res.json({
      ok: true,
      user: updatedUser
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
}

const deleteUser = async (req, res = response) => {

  const uid = req.params.id;
  try {
    const userDB = await User.findById( uid );
    if ( !userDB ) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found'
      });
    }

    await User.findByIdAndDelete( uid );

    res.json({
      ok:true,
      uid,
      msg: 'Deleted'
    });    
  } catch(error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
}

module.exports = { getUsers, createUser, updateUser, deleteUser };