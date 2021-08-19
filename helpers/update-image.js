const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImage = (path) => {
  if ( fs.existsSync(path) ) {
    fs.unlinkSync(path);
  }
}

const updateImage = async (collection, id, filename) => {
  let oldPath = '';
  switch (collection) {
    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('Doctor not found');
        return false;
      }
      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImage(oldPath);
      
      doctor.img = filename;
      await doctor.save();
      return true;
    break;

    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('Hospital not found');
        return false;
      }
      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);
      
      hospital.img = filename;
      await hospital.save();
      return true;
    break;

    case 'users':
      const user = await User.findById(id);
      if (!user) {
        console.log('User not found');
        return false;
      }
      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);
      
      user.img = filename;
      await user.save();
      return true;
    break;
  
    // default:
    // break;
  }

}


module.exports = {
  updateImage
}