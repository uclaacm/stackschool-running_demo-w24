-- in psql terminal

CREATE DATABASE sr_database;

-- \c into sr_database

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    artist VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0
);

CREATE TABLE song_likes (
    id SERIAL PRIMARY KEY,
    song_id INTEGER REFERENCES songs(id),
    user_id INTEGER REFERENCES users(id)
);