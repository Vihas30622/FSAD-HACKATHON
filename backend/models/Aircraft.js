// ============================================================
// AIRCRAFT MODEL - DATABASE LAYER
// ============================================================

const { pool } = require('../config/database');

class AircraftModel {
    // Create aircraft
    static async create(aircraftData) {
        try {
            const query = `INSERT INTO aircraft 
                (airline_id, aircraft_name, aircraft_model, total_seats, 
                economy_seats, business_seats, manufacturing_year)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const [result] = await pool.query(query, [
                aircraftData.airline_id,
                aircraftData.aircraft_name,
                aircraftData.aircraft_model,
                aircraftData.total_seats,
                aircraftData.economy_seats,
                aircraftData.business_seats,
                aircraftData.manufacturing_year
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Find aircraft by ID
    static async findById(aircraftId) {
        try {
            const query = `SELECT * FROM aircraft WHERE id = ? AND is_active = TRUE`;
            const [rows] = await pool.query(query, [aircraftId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Get aircraft by airline
    static async getByAirline(airlineId) {
        try {
            const query = `SELECT * FROM aircraft WHERE airline_id = ? AND is_active = TRUE ORDER BY aircraft_name ASC`;
            const [rows] = await pool.query(query, [airlineId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get all aircraft
    static async getAll(limit = 50, offset = 0) {
        try {
            const query = `SELECT a.*, al.name as airline_name FROM aircraft a 
                          LEFT JOIN airlines al ON a.airline_id = al.id 
                          WHERE a.is_active = TRUE 
                          ORDER BY a.aircraft_name ASC 
                          LIMIT ? OFFSET ?`;
            const [rows] = await pool.query(query, [limit, offset]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Update aircraft
    static async update(aircraftId, updateData) {
        try {
            const query = `UPDATE aircraft SET 
                          aircraft_name = ?, aircraft_model = ?, total_seats = ?,
                          economy_seats = ?, business_seats = ?, updated_at = CURRENT_TIMESTAMP
                          WHERE id = ?`;
            const [result] = await pool.query(query, [
                updateData.aircraft_name,
                updateData.aircraft_model,
                updateData.total_seats,
                updateData.economy_seats,
                updateData.business_seats,
                aircraftId
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AircraftModel;
