-- Delete and create database
DROP DATABASE IF EXISTS gatssounds;
CREATE DATABASE gatssounds;

-- Switch to this database
\c gatssounds;

-- Create tables
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(50) UNIQUE,
   password VARCHAR
);

CREATE TABLE favorites (
   userid SERIAL REFERENCES users (id),
   video JSONB
);

-- Create index on jsonb data
CREATE UNIQUE INDEX videoid ON favorites ((video->'id'));

-- Create user
DROP USER IF EXISTS bill;
CREATE USER bill WITH ENCRYPTED PASSWORD 'gatsbill' CREATEDB;

-- Give the user rights on created tables
GRANT ALL PRIVILEGES ON users TO bill;
GRANT ALL PRIVILEGES ON favorites TO bill;

GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO bill;
GRANT USAGE, SELECT ON SEQUENCE favorites_id_seq TO bill;

-- Test Table real quick
INSERT INTO users (username, password) VALUES ('Bill', 'test');
SELECT * FROM users;
DELETE FROM users;
SELECT * FROM users;
