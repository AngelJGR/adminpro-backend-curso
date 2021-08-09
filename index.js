require('dotenv').config();

const express = require('express');
const cors = require("cors");

const { dbConnection } = require('./database/config');

// Crea el servidor express
const app = express();

// DbConnection
dbConnection();

// Configurar CORS
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hola mundo!'
  })
});

app.listen(process.env.PORT, () => {
  console.log('Server on port', process.env.PORT);
})

// User angeljgr
// password BFiaqg0PwFGzenwU