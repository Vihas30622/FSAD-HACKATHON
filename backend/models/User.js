// ============================================================
// USER MODEL - DATABASE LAYER
// ============================================================

const { pool } = require('../config/database');

class UserModel {
    // Create new user
    static async create(name, email, hashedPassword, phone = null, role = 'user') {
        try {
            const query = `INSERT INTO users (name, email, password, phone, role) 
                          VALUES (?, ?, ?, ?, ?)`;
            const [result] = await pool.query(query, [name, email, hashedPassword, phone, role]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const query = `SELECT * FROM users WHERE email = ?`;
            const [rows] = await pool.query(query, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(userId) {
        try {
            const query = `SELECT id, name, email, phone, role, passport_number, date_of_birth, 
                          profile_picture_url, is_active, created_at, updated_at FROM users WHERE id = ?`;
            const [rows] = await pool.query(query, [userId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Update user profile
    static async updateProfile(userId, name, phone, passport_number, date_of_birth) {
        try {
            const query = `UPDATE users SET name = ?, phone = ?, passport_number = ?, 
                          date_of_birth = ?, updated_at = CURRENT_TIMESTAMP 
                          WHERE id = ?`;
            const [result] = await pool.query(query, [name, phone, passport_number, date_of_birth, userId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Update password
    static async updatePassword(userId, hashedPassword) {
        try {
            const query = `UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
            const [result] = await pool.query(query, [hashedPassword, userId]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get all users (admin)
    static async getAllUsers(limit = 50, offset = 0) {
        try {
            const query = `SELECT id, name, email, phone, role, is_active, created_at FROM users 
                          LIMIT ? OFFSET ?`;
            const [rows] = await pool.query(query, [limit, offset]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get total user count
    static async getTotalCount() {
        try {
            const query = `SELECT COUNT(*) as total FROM users`;
            const [rows] = await pool.query(query);
            return rows[0].total;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
