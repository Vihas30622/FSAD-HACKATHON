// ============================================================
// BOOKING MODEL - DATABASE LAYER
// ============================================================

const { pool } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class BookingModel {
    // Create new booking
    static async create(bookingData) {
        try {
            const bookingReference = `BK${Date.now()}${uuidv4().slice(0, 8).toUpperCase()}`;
            
            const query = `INSERT INTO bookings 
                (user_id, flight_id, seat_id, booking_reference, status, total_amount, 
                passenger_name, passenger_email, passenger_phone, passenger_passport, special_requests)
                VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?)`;
            
            const [result] = await pool.query(query, [
                bookingData.user_id,
                bookingData.flight_id,
                bookingData.seat_id,
                bookingReference,
                bookingData.total_amount,
                bookingData.passenger_name,
                bookingData.passenger_email,
                bookingData.passenger_phone || null,
                bookingData.passenger_passport || null,
                bookingData.special_requests || null
            ]);
            
            return { ...result, bookingReference };
        } catch (error) {
            throw error;
        }
    }

    // Find booking by ID with details
    static async findById(bookingId) {
        try {
            const query = `SELECT b.*, f.flight_number, f.origin, f.destination, 
                          f.departure_time, f.arrival_time, a.name as airline_name, 
                          s.seat_number, s.seat_class
                          FROM bookings b 
                          LEFT JOIN flights f ON b.flight_id = f.id 
                          LEFT JOIN airlines a ON f.airline_id = a.id
                          LEFT JOIN seats s ON b.seat_id = s.id 
                          WHERE b.id = ?`;
            const [rows] = await pool.query(query, [bookingId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Find booking by reference
    static async findByReference(bookingReference) {
        try {
            const query = `SELECT * FROM bookings WHERE booking_reference = ?`;
            const [rows] = await pool.query(query, [bookingReference]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Get all bookings for a user
    static async getByUserId(userId, limit = 50, offset = 0) {
        try {
            const query = `SELECT b.*, f.flight_number, f.origin, f.destination, 
                          f.departure_time, a.name as airline_name, s.seat_number
                          FROM bookings b 
                          LEFT JOIN flights f ON b.flight_id = f.id 
                          LEFT JOIN airlines a ON f.airline_id = a.id
                          LEFT JOIN seats s ON b.seat_id = s.id 
                          WHERE b.user_id = ? 
                          ORDER BY b.created_at DESC 
                          LIMIT ? OFFSET ?`;
            const [rows] = await pool.query(query, [userId, limit, offset]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Update booking status
    static async updateStatus(bookingId, status) {
        try {
            const query = `UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            const [result] = await pool.query(query, [status, bookingId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Update boarding pass info
    static async updateBoardingPass(bookingId, boardingPassUrl) {
        try {
            const query = `UPDATE bookings SET boarding_pass_generated = TRUE, 
                          boarding_pass_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            const [result] = await pool.query(query, [boardingPassUrl, bookingId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Cancel booking
    static async cancelBooking(bookingId) {
        try {
            const query = `UPDATE bookings SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            const [result] = await pool.query(query, [bookingId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get bookings by flight
    static async getByFlightId(flightId) {
        try {
            const query = `SELECT b.*, s.seat_number FROM bookings b 
                          LEFT JOIN seats s ON b.seat_id = s.id 
                          WHERE b.flight_id = ? AND b.status != 'cancelled'`;
            const [rows] = await pool.query(query, [flightId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get booking statistics
    static async getStatistics(startDate = null, endDate = null) {
        try {
            let query = `SELECT 
                        COUNT(*) as total_bookings,
                        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
                        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
                        SUM(total_amount) as revenue
                        FROM bookings 
                        WHERE 1=1`;
            const params = [];
            
            if (startDate) {
                query += ` AND created_at >= ?`;
                params.push(startDate);
            }
            
            if (endDate) {
                query += ` AND created_at <= ?`;
                params.push(endDate);
            }
            
            const [rows] = await pool.query(query, params);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookingModel;
