-- Create user
DROP USER IF EXISTS bill;
CREATE USER bill WITH ENCRYPTED PASSWORD 'gatsbill' CREATEDB;

-- Delete and create database
DROP DATABASE IF EXISTS gatssounds;
CREATE DATABASE gatssounds;

-- Switch to this database
\c gatssounds;

-- Create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR
);

-- Give the user rights on created tables
GRANT ALL PRIVILEGES ON users TO bill;

-- Test Table real quick
INSERT INTO users (username, password) VALUES ('Bill', 'test');
SELECT * FROM users;
DELETE FROM users;
SELECT * FROM users;
