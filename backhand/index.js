const connectToMongo = require('./db');  // Make sure './db' is correct
const express = require('express');
var cors = require('cors');
require('dotenv').config(); // Load env variables



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
  connectToMongo(); // Connect to DB when server starts
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



