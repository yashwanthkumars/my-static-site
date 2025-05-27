// Express + SQLite backend for Devtools Employee Attendance
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite DB
const db = new sqlite3.Database('./attendance.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        student_id TEXT,
        mother_name TEXT,
        father_name TEXT,
        guardian_phone TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER,
        date TEXT,
        status TEXT,
        FOREIGN KEY(employee_id) REFERENCES employees(id)
    )`);
});

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// Pre-populate employees if table is empty
const defaultEmployees = [
    'Alice Johnson',
    'Bob Smith',
    'Charlie Brown',
    'David Lee',
    'Eva Green',
    'Yashwanth Kumar',
    'Priya Patel',
    'Ravi Kumar',
    'Samantha Ray',
    'Zara Ali'
];
db.all('SELECT COUNT(*) as count FROM employees', [], (err, rows) => {
    if (!err && rows[0].count === 0) {
        const stmt = db.prepare('INSERT INTO employees (name) VALUES (?)');
        defaultEmployees.forEach(name => stmt.run(name));
        stmt.finalize();
    }
});

// Register employee
app.post('/api/employees', (req, res) => {
    const { name, student_id, mother_name, father_name, guardian_phone } = req.body;
    db.run(
        `INSERT INTO employees (name, student_id, mother_name, father_name, guardian_phone) VALUES (?, ?, ?, ?, ?)`,
        [name, student_id, mother_name, father_name, guardian_phone],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Get all employees
app.get('/api/employees', (req, res) => {
    db.all(`SELECT * FROM employees`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Save attendance for a date
app.post('/api/attendance', (req, res) => {
    const { employee_id, date, status } = req.body;
    db.run(
        `INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)`,
        [employee_id, date, status],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Get attendance for a date
app.get('/api/attendance', (req, res) => {
    const { date } = req.query;
    db.all(
        `SELECT a.id, e.name, a.status FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.date = ?`,
        [date],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
