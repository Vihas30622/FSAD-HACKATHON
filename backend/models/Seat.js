// ============================================================
// SEAT MODEL - DATABASE LAYER
// ============================================================

const { pool } = require('../config/database');

class SeatModel {
    // Get all seats for a flight
    static async getSeatsByFlight(flightId) {
        try {
            const query = `SELECT * FROM seats WHERE flight_id = ? ORDER BY seat_number ASC`;
            const [rows] = await pool.query(query, [flightId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get seat by ID
    static async findById(seatId) {
        try {
            const query = `SELECT * FROM seats WHERE id = ?`;
            const [rows] = await pool.query(query, [seatId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    // Get available seats for a flight
    static async getAvailableSeats(flightId, seatClass = null) {
        try {
            let query = `SELECT * FROM seats WHERE flight_id = ? AND status = 'available'`;
            const params = [flightId];
            
            if (seatClass) {
                query += ` AND seat_class = ?`;
                params.push(seatClass);
            }
            
            query += ` ORDER BY seat_number ASC`;
            const [rows] = await pool.query(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Reserve seat (temporary hold)
    static async reserveSeat(seatId, reservedUntil) {
        try {
            const query = `UPDATE seats SET status = 'reserved', reserved_until = ? 
                          WHERE id = ? AND status = 'available'`;
            const [result] = await pool.query(query, [reservedUntil, seatId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Book seat (permanent)
    static async bookSeat(seatId) {
        try {
            const query = `UPDATE seats SET status = 'booked', reserved_until = NULL 
                          WHERE id = ? AND (status = 'available' OR status = 'reserved')`;
            const [result] = await pool.query(query, [seatId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Release reserved seat
    static async releaseReservedSeat(seatId) {
        try {
            const query = `UPDATE seats SET status = 'available', reserved_until = NULL 
                          WHERE id = ? AND status = 'reserved'`;
            const [result] = await pool.query(query, [seatId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Get expired reservations
    static async getExpiredReservations() {
        try {
            const query = `SELECT * FROM seats WHERE status = 'reserved' 
                          AND reserved_until < NOW()`;
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Create seats for a flight
    static async createSeatsForFlight(flightId, totalSeats, economySeats, businessSeats) {
        try {
            const query = `INSERT INTO seats (flight_id, seat_number, seat_class, status) VALUES `;
            const values = [];
            
            // Create economy seats
            for (let i = 1; i <= economySeats; i++) {
                values.push(`(${flightId}, 'E${i}', 'economy', 'available')`);
            }
            
            // Create business seats
            for (let i = 1; i <= businessSeats; i++) {
                values.push(`(${flightId}, 'B${i}', 'business', 'available')`);
            }
            
            const fullQuery = query + values.join(', ');
            const [result] = await pool.query(fullQuery);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Get seat statistics for a flight
    static async getSeatStatistics(flightId) {
        try {
            const query = `SELECT 
                          seat_class,
                          COUNT(*) as total,
                          SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available,
                          SUM(CASE WHEN status = 'booked' THEN 1 ELSE 0 END) as booked,
                          SUM(CASE WHEN status = 'reserved' THEN 1 ELSE 0 END) as reserved
                          FROM seats 
                          WHERE flight_id = ?
                          GROUP BY seat_class`;
            const [rows] = await pool.query(query, [flightId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SeatModel;
