-- ============================================================
--  Campus Portal - Full Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS campus_portal;
USE campus_portal;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  email    VARCHAR(100) UNIQUE NOT NULL,
  name     VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role     ENUM('student','admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
INSERT IGNORE INTO users (email, name, password, role)
VALUES ('admin@g.bracu.ac.bd ', 'Admin', 'admin123', 'admin');

-- Requests
CREATE TABLE IF NOT EXISTS requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category    VARCHAR(100) DEFAULT 'General',
  image       VARCHAR(255),
  status      ENUM('Pending','In Progress','Completed','Rejected') DEFAULT 'Pending',
  admin_note  TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Feedback
CREATE TABLE IF NOT EXISTS feedback (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  request_id  INT NOT NULL,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_feedback (user_id, request_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (request_id) REFERENCES requests(id)
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  facility    VARCHAR(100) NOT NULL,
  date        DATE NOT NULL,
  time_slot   VARCHAR(50) NOT NULL,
  purpose     TEXT,
  status      ENUM('Confirmed','Cancelled') DEFAULT 'Confirmed',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  message    TEXT NOT NULL,
  priority   ENUM('normal','high','urgent') DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  date        DATE NOT NULL,
  location    VARCHAR(255) NOT NULL,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users 
MODIFY role ENUM('student','alumni','faculty','admin') DEFAULT 'student';