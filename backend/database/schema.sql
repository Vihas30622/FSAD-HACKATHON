-- ============================================================
-- AIRLINE FLIGHT BOOKING AND RESERVATION SYSTEM DATABASE
-- ============================================================

-- Drop database if exists and create new
DROP DATABASE IF EXISTS indian_airline_booking;
CREATE DATABASE indian_airline_booking;
USE indian_airline_booking;

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('user', 'admin', 'airline_staff') DEFAULT 'user',
    passport_number VARCHAR(50),
    date_of_birth DATE,
    profile_picture_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- ============================================================
-- AIRLINES TABLE
-- ============================================================
CREATE TABLE airlines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    primary_color VARCHAR(7) NOT NULL,
    secondary_color VARCHAR(7) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    airline_code VARCHAR(3) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_airline_code (airline_code)
);

-- ============================================================
-- AIRCRAFT TABLE
-- ============================================================
CREATE TABLE aircraft (
    id INT PRIMARY KEY AUTO_INCREMENT,
    airline_id INT NOT NULL,
    aircraft_name VARCHAR(255) NOT NULL,
    aircraft_model VARCHAR(100) NOT NULL,
    total_seats INT NOT NULL,
    economy_seats INT NOT NULL,
    business_seats INT NOT NULL,
    manufacturing_year INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (airline_id) REFERENCES airlines(id) ON DELETE CASCADE,
    INDEX idx_airline_id (airline_id)
);

-- ============================================================
-- FLIGHTS TABLE
-- ============================================================
CREATE TABLE flights (
    id INT PRIMARY KEY AUTO_INCREMENT,
    airline_id INT NOT NULL,
    aircraft_id INT NOT NULL,
    flight_number VARCHAR(50) NOT NULL UNIQUE,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    price_economy DECIMAL(10, 2) NOT NULL,
    price_business DECIMAL(10, 2) NOT NULL,
    available_seats INT NOT NULL,
    total_seats INT NOT NULL,
    status ENUM('scheduled', 'delayed', 'boarding', 'departed', 'landed', 'cancelled') DEFAULT 'scheduled',
    duration_minutes INT,
    stops INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (airline_id) REFERENCES airlines(id) ON DELETE CASCADE,
    FOREIGN KEY (aircraft_id) REFERENCES aircraft(id) ON DELETE CASCADE,
    INDEX idx_airline_id (airline_id),
    INDEX idx_flight_number (flight_number),
    INDEX idx_route (origin, destination),
    INDEX idx_departure_time (departure_time),
    INDEX idx_status (status)
);

-- ============================================================
-- SEATS TABLE
-- ============================================================
CREATE TABLE seats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flight_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    seat_class ENUM('economy', 'business') NOT NULL,
    status ENUM('available', 'booked', 'reserved', 'blocked') DEFAULT 'available',
    reserved_until DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
    UNIQUE KEY unique_seat (flight_id, seat_number),
    INDEX idx_flight_id (flight_id),
    INDEX idx_status (status)
);

-- ============================================================
-- BOOKINGS TABLE
-- ============================================================
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    seat_id INT NOT NULL,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    passenger_name VARCHAR(255) NOT NULL,
    passenger_email VARCHAR(255) NOT NULL,
    passenger_phone VARCHAR(20),
    passenger_passport VARCHAR(50),
    boarding_pass_generated BOOLEAN DEFAULT FALSE,
    boarding_pass_url VARCHAR(500),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES flights(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_booking_reference (booking_reference),
    INDEX idx_status (status),
    INDEX idx_flight_id (flight_id)
);

-- ============================================================
-- PAYMENTS TABLE
-- ============================================================
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'net_banking', 'upi', 'wallet') NOT NULL,
    payment_status ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(100) UNIQUE,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    razorpay_signature VARCHAR(255),
    card_last_four VARCHAR(4),
    upi_id VARCHAR(100),
    attempt_count INT DEFAULT 0,
    error_message TEXT,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking_id (booking_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_transaction_id (transaction_id)
);

-- ============================================================
-- NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    booking_id INT,
    notification_type ENUM('booking_confirmation', 'payment_success', 'boarding_pass', 'flight_update', 'cancellation', 'refund', 'reminder') NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    email_sent BOOLEAN DEFAULT FALSE,
    sms_sent BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_notification_type (notification_type),
    INDEX idx_created_at (created_at)
);

-- ============================================================
-- SAMPLE DATA INSERTION
-- ============================================================

-- Insert Airlines with authentic Indian airlines
INSERT INTO airlines (name, primary_color, secondary_color, logo_url, airline_code, description, is_active) VALUES
('Air India', '#003DA5', '#FFFFFF', 'https://example.com/air-india.png', 'AI', 'National carrier of India', TRUE),
('IndiGo', '#4B0082', '#FFFFFF', 'https://example.com/indigo.png', 'IG', 'Leading low-cost carrier', TRUE),
('Vistara', '#4169E1', '#FFFFFF', 'https://example.com/vistara.png', 'UK', 'Full-service airline', TRUE),
('SpiceJet', '#FFD700', '#000000', 'https://example.com/spicejet.png', 'SG', 'Budget airline', TRUE),
('Akasa Air', '#FF6B35', '#FFFFFF', 'https://example.com/akasa.png', 'QP', 'New generation airline', TRUE);

-- Insert Aircraft with realistic configurations
INSERT INTO aircraft (airline_id, aircraft_name, aircraft_model, total_seats, economy_seats, business_seats, manufacturing_year, is_active) VALUES
(1, 'VT-AIX', 'Boeing 787-8 Dreamliner', 254, 218, 36, 2015, TRUE),
(1, 'VT-AIY', 'Airbus A320', 180, 150, 30, 2018, TRUE),
(2, 'VT-IGL', 'Airbus A320', 180, 150, 30, 2017, TRUE),
(2, 'VT-IGM', 'Airbus A320neo', 189, 159, 30, 2019, TRUE),
(3, 'VT-TSC', 'Airbus A320', 180, 150, 30, 2016, TRUE),
(4, 'VT-SPI', 'Boeing 737 MAX 8', 189, 159, 30, 2019, TRUE),
(5, 'VT-AKA', 'Airbus A320neo', 189, 159, 30, 2023, TRUE);

-- ============================================================
-- CREATE INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================

CREATE INDEX idx_booking_created_at ON bookings(created_at);
CREATE INDEX idx_user_flights ON bookings(user_id, created_at);
CREATE INDEX idx_flight_dates ON flights(departure_time, arrival_time);
CREATE INDEX idx_flight_pricing ON flights(airline_id, price_economy, price_business);
CREATE INDEX idx_seat_flight_status ON seats(flight_id, status);
CREATE INDEX idx_notification_user_created ON notifications(user_id, created_at);

-- ============================================================
-- END OF SCHEMA
-- ============================================================
