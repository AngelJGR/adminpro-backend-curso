const jwt = require('jsonwebtoken');
const User = require('../models/user')

const validateJwt = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    res.status(401).json({
      ok: false,
      msg:'No token provided'
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    });
  }

  next();
}

const validateAdminRole = async (req, res, next) => {
  const uid = req.uid
  try {
    const userDB = await User.findById(uid)
    if (!userDB)
      return res.status(400).json({
        ok: false,
        msg: 'User doesn\'t exist'
      })
    
    if (userDB.role !== 'ADMIN_ROLE')
      return res.status(403).json({
        ok: false,
        msg: 'Unauthorizer user'
      })
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'User is not admin'
    })
  }
}

module.exports = {
  validateJwt,
  validateAdminRole
}