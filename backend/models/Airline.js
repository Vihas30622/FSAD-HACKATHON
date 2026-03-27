// ============================================================
// AIRLINE MODEL - DATABASE LAYER
// ============================================================

const { pool } = require('../config/database');

class AirlineModel {
    // Get all airlines
    static async getAll() {
        try {
            const query = `SELECT * FROM airlines WHERE is_active = TRUE ORDER BY name ASC`;
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Find airline by ID
    static async findById(airlineId) {
        try {
            const query = `SELECT * FROM airlines WHERE id = ? AND is_active = TRUE`;
            const [rows] = await pool.query(query, [airlineId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Find airline by code
    static async findByCode(airlineCode) {
        try {
            const query = `SELECT * FROM airlines WHERE airline_code = ? AND is_active = TRUE`;
            const [rows] = await pool.query(query, [airlineCode]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Create airline
    static async create(airlineData) {
        try {
            const query = `INSERT INTO airlines (name, primary_color, secondary_color, logo_url, airline_code, description)
                          VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await pool.query(query, [
                airlineData.name,
                airlineData.primary_color,
                airlineData.secondary_color,
                airlineData.logo_url,
                airlineData.airline_code,
                airlineData.description
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Update airline
    static async update(airlineId, updateData) {
        try {
            const query = `UPDATE airlines SET 
                          name = ?, primary_color = ?, secondary_color = ?, 
                          logo_url = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
                          WHERE id = ?`;
            const [result] = await pool.query(query, [
                updateData.name,
                updateData.primary_color,
                updateData.secondary_color,
                updateData.logo_url,
                updateData.description,
                airlineId
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get airline statistics
    static async getStatistics(airlineId) {
        try {
            const query = `SELECT 
                          COUNT(DISTINCT f.id) as total_flights,
                          SUM(CASE WHEN f.status = 'scheduled' THEN 1 ELSE 0 END) as scheduled_flights,
                          COUNT(DISTINCT b.id) as total_bookings,
                          SUM(b.total_amount) as total_revenue
                          FROM airlines a
                          LEFT JOIN flights f ON a.id = f.airline_id
                          LEFT JOIN bookings b ON f.id = b.flight_id AND b.status = 'confirmed'
                          WHERE a.id = ?`;
            const [rows] = await pool.query(query, [airlineId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AirlineModel;
