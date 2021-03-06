const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    console.log('Db Connected!!');
  } catch(error) {
    console.log(error);
    throw new Error('Error al conectar a la base de datos');
  }

}

module.exports = {
  dbConnection
}