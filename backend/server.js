const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Replace bodyParser.json() with express.json()
app.use(express.urlencoded({ extended: true })); // Replace bodyParser.urlencoded() with express.urlencoded()

// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yourdatabase'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit the process with a failure code
  }
  console.log('Connected to MySQL database.');
});

// Signup route
app.post('/yourdatabase', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    res.status(200).json({ message: 'Login successful', user });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//with bcrypt

// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcrypt');

// const app = express();
// const port = 8081;

// app.use(cors());
// app.use(bodyParser.json());

// // Create connection to MySQL
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'yourdatabase'
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     process.exit(1); // Exit the process with a failure code
//   }
//   console.log('Connected to MySQL database.');
// });

// // Signup route
// app.post('/yourdatabase', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
//     const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
//     db.query(query, [name, email, hashedPassword], (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         return res.status(500).json({ error: 'Database error' });
//       }
//       res.status(201).json({ message: 'User created successfully' });
//     });
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login route
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required' });
//   }

//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const user = results[0];
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ error: 'Internal server error' });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
