// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5050;

// Middleware
app.use(cors()); // Allows frontend to connect
app.use(express.json()); // Lets server parse JSON data

// Basic route to test server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
