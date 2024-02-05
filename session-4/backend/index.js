const express = require("express");
const app = express();

const pool = require("./db"); // needed for db access

app.listen(8000, () => {
  console.log("Server is listening on port 8000")
});

app.use(express.json()) // => req.body

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

app.post("/songs", async (req, res) => {
  const { artist, title, user_id } = req.body;
  const currentDate = new Date();

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

app.delete("/songs/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSong = await pool.query("DELETE FROM songs WHERE id = $1", [id]);
    res.json("Song was successfully deleted.");
  } catch (err) {
    console.error(err.message);
  }
});