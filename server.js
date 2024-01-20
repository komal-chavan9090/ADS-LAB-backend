const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'react_mysql_crud',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Get all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(result);
    }
  });
});

// Add a new employee
app.post('/api/employees', (req, res) => {
  const employee = req.body;
  console.log(employee);
  db.query('INSERT INTO employees SET ?', employee, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(result);
    }
  });
});

// Update an employee by ID
app.put('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;
  
  db.query('UPDATE employees SET ? WHERE id = ?', [updatedEmployee, employeeId], (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(result);
    }
  });
});

// Delete an employee by ID
app.delete('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  
  db.query('DELETE FROM employees WHERE id = ?', employeeId, (err, result) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
