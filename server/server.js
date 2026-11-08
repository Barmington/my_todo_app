import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
// import { session } from 'express-session';
// import pgSession from 'connect-pg-simple';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'todos',
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

pool.connect().then(() => {
  console.log('Connected to todos database!');
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     store: new pgSession({ pool: pool, createTableIfMissing: true }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       sameSite: lax,
//       maxAge: 1000 * 60 * 60,
//     },
//   }),
// );
app.use(cors());

app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todo');

    res.status(200).json(result.rows);
  } catch (error) {
    console.error({ Error: error });
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.get('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM  todo WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching todo:', error);

    return res.status(500).json({
      error: 'Server Internal error',
    });
  }
});

app.post('/todos', async (req, res) => {
  const { task, task_time } = req.body;
  if (task !== 'string' && null) {
    res.status(404).json({
      error: 'Please enter todo',
    });
  }
  try {
    const results = await pool.query(
      `INSERT INTO todo (task, task_time)
          VALUES ($1, $2) RETURNING *`,
      [task, task_time],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error('Error creating todos', error);
    res.status(500).json({ Error: 'Failed to  create todo' });
  }
});
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const del = await pool.query(`DELETE FROM todo WHERE id = $1 RETURNING *`, [
      id,
    ]);
    if (del.rows.length === 0) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }
    res.status(200).json(del.rows[0]);
  } catch (error) {
    console.error('Error deleting todo', error);
  }
  res.status(500).json({ Error: 'Failed to delete todo' });
});

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, task_time } = req.body;

  try {
    const result = await pool.query(
      `UPDATE todo
       SET task = $1, task_time = $2
       WHERE id = $3
       RETURNING *`,
      [task, task_time, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);

    return res.status(500).json({
      error: 'Failed to update todo',
    });
  }
});
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
