#Database Tables (MySQL)
#Users (with roles + authentication)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('student','admin','faculty','alumni') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
#Service Requests
CREATE TABLE service_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    status ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
#Awareness Dashboard
CREATE TABLE awareness_posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    request_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (request_id) REFERENCES service_requests(request_id)
);
#Feedback Table
CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (request_id) REFERENCES service_requests(request_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
#Facility
CREATE TABLE facilities (
    facility_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    description TEXT
);
#booking
CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    facility_id INT,
    user_id INT,
    date DATE,
    start_time TIME,
    end_time TIME,
    status ENUM('Booked','Cancelled') DEFAULT 'Booked',

    FOREIGN KEY (facility_id) REFERENCES facilities(facility_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

#Announcements
CREATE TABLE announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#Events
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    event_date DATE,
    event_time TIME,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
