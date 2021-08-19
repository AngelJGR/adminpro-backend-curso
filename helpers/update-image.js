const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const updateImage = async (collection, id, filename) => {
  
  switch (collection) {
    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('Doctor not found');
        return false;
      }
      const oldPath = `./uploads/doctors/${doctor.img}`;
      // Delete old img
      if ( fs.existsSync(oldPath) ) {
        fs.unlinkSync(oldPath);
      }
      doctor.img = filename;
      await doctor.save();

    break;
    case 'hospitals':
      
    break;
    case 'users':
      
    break;
  
    default:
    break;
  }

}


module.exports = {
  updateImage
}