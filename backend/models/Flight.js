// ============================================================
// FLIGHT MODEL - DATABASE LAYER
// ============================================================

const { pool } = require('../config/database');

class FlightModel {
    // Create new flight
    static async create(flightData) {
        try {
            const query = `INSERT INTO flights 
                (airline_id, aircraft_id, flight_number, origin, destination, 
                departure_time, arrival_time, price_economy, price_business, 
                available_seats, total_seats, duration_minutes, stops)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            const [result] = await pool.query(query, [
                flightData.airline_id,
                flightData.aircraft_id,
                flightData.flight_number,
                flightData.origin,
                flightData.destination,
                flightData.departure_time,
                flightData.arrival_time,
                flightData.price_economy,
                flightData.price_business,
                flightData.available_seats,
                flightData.total_seats,
                flightData.duration_minutes,
                flightData.stops
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Find flight by ID with airline details
    static async findById(flightId) {
        try {
            const query = `SELECT f.*, a.name as airline_name, a.primary_color, a.secondary_color
                          FROM flights f 
                          LEFT JOIN airlines a ON f.airline_id = a.id 
                          WHERE f.id = ?`;
            const [rows] = await pool.query(query, [flightId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Search flights by route and date
    static async searchByRoute(origin, destination, departureDate) {
        try {
            const query = `SELECT f.*, a.name as airline_name, a.primary_color, a.secondary_color
                          FROM flights f 
                          LEFT JOIN airlines a ON f.airline_id = a.id 
                          WHERE f.origin = ? AND f.destination = ? 
                          AND DATE(f.departure_time) = ? 
                          AND f.status = 'scheduled' 
                          AND f.is_active = TRUE
                          ORDER BY f.departure_time ASC`;
            const [rows] = await pool.query(query, [origin, destination, departureDate]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get all flights
    static async getAll(limit = 50, offset = 0) {
        try {
            const query = `SELECT f.*, a.name as airline_name 
                          FROM flights f 
                          LEFT JOIN airlines a ON f.airline_id = a.id 
                          WHERE f.is_active = TRUE 
                          ORDER BY f.departure_time DESC 
                          LIMIT ? OFFSET ?`;
            const [rows] = await pool.query(query, [limit, offset]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Update flight status
    static async updateStatus(flightId, status) {
        try {
            const query = `UPDATE flights SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            const [result] = await pool.query(query, [status, flightId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Update available seats
    static async updateAvailableSeats(flightId, availableSeats) {
        try {
            const query = `UPDATE flights SET available_seats = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            const [result] = await pool.query(query, [availableSeats, flightId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get flights by airline
    static async getByAirline(airlineId, limit = 50, offset = 0) {
        try {
            const query = `SELECT f.*, a.name as airline_name 
                          FROM flights f 
                          LEFT JOIN airlines a ON f.airline_id = a.id 
                          WHERE f.airline_id = ? AND f.is_active = TRUE 
                          ORDER BY f.departure_time DESC 
                          LIMIT ? OFFSET ?`;
            const [rows] = await pool.query(query, [airlineId, limit, offset]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FlightModel;
