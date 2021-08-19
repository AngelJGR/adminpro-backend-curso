const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = (req, res = response) => {

  const { collection, id } = req.params;

  const collections = ['doctors', 'hospitals', 'users'];

  if (!collections.includes(collection)) {
    return res.status(400).json({
      ok: true,
      msg: 'Invalid collection'
    });
  }

  if ( !req.files || Object.keys(req.files).length === 0 ) {
    return res.status(400).json({
      ok: true,
      msg: 'No file selected'
    });
  }

  const file = req.files.image;
  const cutName = file.name.split('.');
  const ext = cutName[cutName.length -1];

  const validExt = ['png', 'jpg', 'jpeg', 'gif'];
  if (!validExt.includes(ext.toLowerCase())) {
    return res.status(400).json({
      ok: false,
      msg: 'unsupported file'
    });
  }

  const filename = `${ uuidv4() }.${ext}`;
  const path = `./uploads/${collection}/${filename}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'An error was occurred when file uploads'
      });      
    }

    updateImage(collection, id, filename);

    res.json({
      ok: true,
      msg: 'File upload successfuly',
      filename
    });
  });
}

module.exports = {
  fileUpload
}