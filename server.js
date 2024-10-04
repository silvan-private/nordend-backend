const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'nordend-db-instance-1.cveqq08oui8w.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  password: '$scSL5!2xxyzWeg%6oblr',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,  // Allow self-signed SSL certificates
  }
});


// API endpoint to handle form data submission
app.post('/waitlist', async (req, res) => {
  const { name, email } = req.body;

  // Log the incoming data to make sure it’s being received
  console.log('Received data:', { name, email });

  try {
    await pool.query('INSERT INTO waitlist (name, email) VALUES ($1, $2)', [name, email]);
    res.status(200).send('User added to the waiting list');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
