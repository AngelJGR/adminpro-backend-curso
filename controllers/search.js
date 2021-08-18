const { response } = require('express');


const findAll = (req, res = response) => {
  console.log(req.params.all);
  res.json({
    ok:true,
    msg: "SearchAll"
  })
}

module.exports = {
  findAll
}