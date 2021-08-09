const User = require('../models/user');


const getUsers = (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola mundo!'
  })
}

const createUser = async (req, res) => {

  const { name, password, email } = req.body;
  const user = new User({
    name,
    email,
    password
  });

  await user.save();

  res.json({
    ok: true,
    user
  })
}

module.exports = { getUsers, createUser };