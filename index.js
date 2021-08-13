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

// Configurar body
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log('Server on port', process.env.PORT);
})

// User angeljgr
// password BFiaqg0PwFGzenwU