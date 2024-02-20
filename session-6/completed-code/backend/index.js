const express = require("express");
const app = express();
app.use(express.json()) // => req.body
const pool = require("./db"); // needed for db access

// ========================================START OF DEMO========================================

// run npm install bcrypt
const bcrypt = require('bcrypt');

// run openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
// to generate a self-signed certificate

const https = require('https');
const fs = require('fs');

// // read the key and cert that you generated
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

// // create the HTTPS server
const server = https.createServer({ key, cert }, app);

server.listen(8000, () => {
  console.log("Server is listening on port 8000")
});

// =========================================END OF DEMO=========================================

// ROUTES

// USERS

// ========================================START OF DEMO========================================
// create a user
app.post("/register", async (req, res) => {
  const { email, username, first, last, password } = req.body;

  try {
    const existingEmail = await pool.query('SELECT email FROM users WHERE email = $1', [email]);

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const existingUsername = await pool.query('SELECT username FROM users WHERE username = $1', [username]);

    if (existingUsername.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // hashedPassword = password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email, username, first, last, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, username, first, last, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    bcrypt.compare(String(password), String(user.password), (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (result) {
        const { id } = user;
        res.json(id);
      } else {
        res.status(401).json({ error: 'Incorrect password.' });
      }
    });
  } catch (error) {
    console.error('Error authenticating:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/users/all", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a user
app.delete("/users/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    res.json("User was successfully deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

// =========================================END OF DEMO=========================================

// get user by id
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all of a user's songs
app.get('/users/songs/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM songs WHERE user_id = $1', [userId]);
    const songs = result.rows;

    res.json(songs);
  } catch (error) {
    console.error('Error fetching user posts:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// SONGS

// get all songs
app.get("/songs/all", async (req, res) => {
  try {
    const allSongs = await pool.query("SELECT * FROM songs");
    res.json(allSongs.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a song
app.get("/songs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const song = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);
    res.json(song.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get a song's user
app.get("/songs/user/:songId", async (req, res) => {
  const { songId } = req.params;
  try {
    const song = await pool.query("SELECT * FROM songs WHERE id = $1", [songId]);

    if (song.rows.length === 0) {
      return res.status(404).json({ error: 'Song not found' });
    }

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [song.rows[0].user_id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user.rows[0];
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// create a song
app.post("/songs", async (req, res) => {
  const { artist, title, user_id } = req.body;
  const currentDate = new Date();

  console.log("TESTING!");
  try {
    const newSong = await pool.query(
      "INSERT INTO songs (artist, title, user_id, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [artist, title, user_id, currentDate]
    );

    res.json(newSong.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// delete a song
app.delete("/songs/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSong = await pool.query("DELETE FROM songs WHERE id = $1", [id]);
    res.json("Song was successfully deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

// check if a user has liked a song
app.get('/liked/song', async (req, res) => {
  const { songId, userId } = req.query;

  if (!songId || !userId) {
    return res.status(400).json({ error: `Couldn't find song or user` });
  }

  try {
    const checkLikes = await pool.query("SELECT COUNT(*) > 0 AS has_liked FROM song_likes WHERE song_id = $1 AND user_id = $2", [songId, userId]);
    res.json(checkLikes.rows[0]);
  } catch (err) {
    console.error('Error checking like:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// handle a song's likes
app.post('/songs/like', async (req, res) => {
  const { songId, userId } = req.body;

  if (!songId || !userId) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const checkLikes = await pool.query("SELECT COUNT(*) > 0 AS has_liked FROM song_likes WHERE song_id = $1 AND user_id = $2", [songId, userId]);
    const hasLiked = checkLikes.rows[0].has_liked;

    if (hasLiked) {
      await pool.query('DELETE FROM song_likes WHERE song_id = $1 AND user_id = $2', [songId, userId]);
      await pool.query('UPDATE songs SET likes = likes - 1 WHERE id = $1', [songId]);
    } else {
      await pool.query('INSERT INTO song_likes (song_id, user_id) VALUES ($1, $2)', [songId, userId]);
      await pool.query('UPDATE songs SET likes = likes + 1 WHERE id = $1', [songId]);
    }

    const updatedPost = await pool.query('SELECT * FROM songs WHERE id = $1', [songId]);
    res.json(updatedPost.rows[0]);
  } catch (err) {
    console.error('Error updating likes:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});