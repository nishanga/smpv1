const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const client = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query(
      `SELECT u.id, u.username, u.password, u.school_census, s.school_name
       FROM users u
       JOIN schools s ON u.school_census = s.census_no
       WHERE u.username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];
    //console.log("DB Result:", result.rows[0]);

    // ⚠️ For real apps: use bcrypt.compare(password, user.password)
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "✅ Login successful", user: {
        id: user.id,
        username: user.username,
        schoolcensus: user.school_census,
        school: user.school_name
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/annualform", async (req, res) => {
  try {

    const {
      schoolName,
      school_census,
      currentyear,
      eligibleForMeal,
      gender,
      gradeSpan,
      formData
    } = req.body;

    await pool.query1(
      `INSERT INTO annualstudent_count 
         (year, studentcount_male, studentcount_female, grade, school_census) 
         VALUES ($1,$2,$3,$4,$5)`,
      [
        currentyear,
        schoolName,
        eligibleForMeal,
        gender
      ]
    )

    for (const row of formData) {
      await pool.query(
        `INSERT INTO annual_form 
         (school_name, eligible_for_meal, gender, grade_span, grade, total_male, total_female, eligible_male, eligible_female) 
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          schoolName,
          eligibleForMeal,
          gender,
          gradeSpan,
          row.grade,
          row.totalMale,
          row.totalFemale,
          row.eligibleMale,
          row.eligibleFemale,
        ]
      );
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("DB Insert Error:", err);
    res.status(500).json({ success: false, message: "Error saving form" });
  }
});


// Supplier registration
app.post('/supplierregister', async (req, res) => {
  try {
    const { nic, fullname, name_initials, gender, email, phone1, phone2, address } = req.body;

    const result = await client.query(
      `INSERT INTO supplier_info (supplierinfo_nic, supplier_fullname, supplier_nameinitials, supplier_gender,
       supplier_address, supplier_contact1, supplier_contact2, email, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [nic, fullname, name_initials, gender, address, phone1, phone2, email, "active"]
    );

    res.status(201).json({ message: 'Supplier registered successfully', supplier: result.rows[0] });
  } catch (error) {
    console.error('Error inserting supplier:', error);
    res.status(500).json({ error: 'Error inserting supplier' });
  }
});


//view suppliers
app.get('/viewsuppliers', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM supplier_info ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});


app.post('/suppliers', async (req, res) => {
  try {
    const { gender, nic } = req.body;

    let query = 'SELECT * FROM supplier_info WHERE 1=1';
    const params = [];

    if (gender) {
      params.push(`%${gender}%`);
      query += ` AND supplier_gender ILIKE $${params.length}`;
    }

    if (nic) {
      params.push(`%${nic}%`);
      query += ` AND supplierinfo_nic BETWEEN ILIKE $${params.length}`;
    }

    query += ' ORDER BY id DESC';

    const result = await client.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));