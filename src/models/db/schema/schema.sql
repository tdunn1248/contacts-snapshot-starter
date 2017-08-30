DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  admin BOOLEAN 
);
