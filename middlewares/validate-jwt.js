const jwt = require('jsonwebtoken');

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

module.exports = {
  validateJwt
}