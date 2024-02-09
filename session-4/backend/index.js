const express = require("express");
const pool = require("./db"); // needed for db access
const app = express();

app.listen(8000, () => {
  console.log("Server is listening on port 8000")
})

app.use(express.json()) // => req.body

// FUNCTIONS FROM DEMO #########################

// get all songs
app.get("/songs/all", async (req, res) => {
  try {
    const allSongs = await pool.query("SELECT * FROM songs");
    res.json(allSongs.rows);
  } catch (err) {
    console.error(err.message);
  }
})

// add song to database
app.post("/songs", async (req, res) => {
  const { artist, title, user_id } = req.body;
  const currentDate = new Date();
  try {
    const newSong = await pool.query(
      "INSERT INTO songs (artist, title, user_id, date) VALUES ($1, $2, $3, $4) RETURNING id, artist, title, user_id, date, likes",
      [artist, title, user_id, currentDate]
    )
    res.json(newSong.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// delete a song
app.delete("/songs/delete/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const deleteSong = await pool.query("DELETE FROM songs WHERE id = $1", [id]);
    res.json("Song was successfully deleted.");
  } catch (err) {
    console.error(err.message);
  }
});

// END FUNCTIONS FROM DEMO ################################

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

// EVERYTHING ELSE

// delete a user
app.delete("/users/delete/:userId", async(req, res) => {
    try {
        const { userId } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [userId]);
        res.json("User was successfully deleted.");
    } catch (err) {
        console.error(err.message);
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

// edit a user's profile picture
app.put('/users/edit/picture', async (req, res) => {
  const { userId, image } = req.body;

  try {
    const result = await pool.query('UPDATE users SET image = $1 WHERE id = $2 RETURNING id, email, image', [image, userId]);
    const updatedUserData = result.rows[0];
    res.json({ message: 'Profile picture updated successfully', user: updatedUserData });
  } catch (error) {
    console.error('Error updating profile picture:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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
