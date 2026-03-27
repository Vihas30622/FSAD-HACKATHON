// ============================================================
// AUTHENTICATION SERVICE - BUSINESS LOGIC
// ============================================================

const UserModel = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtil');
const { generateAccessToken, generateRefreshToken } = require('../config/jwt');

class AuthService {
    // Register new user
    static async register(name, email, password, phone) {
        try {
            // Check if user already exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                throw new Error('Email already registered');
            }

            // Hash password
            const hashedPassword = await hashPassword(password);

            // Create user
            const result = await UserModel.create(name, email, hashedPassword, phone, 'user');

            return {
                userId: result.insertId,
                name,
                email
            };
        } catch (error) {
            throw error;
        }
    }

    // Login user
    static async login(email, password) {
        try {
            // Find user
            const user = await UserModel.findByEmail(email);
            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Compare password
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            // Generate tokens
            const accessToken = generateAccessToken(user.id, user.email, user.role);
            const refreshToken = generateRefreshToken(user.id);

            return {
                success: true,
                userId: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken,
                refreshToken
            };
        } catch (error) {
            throw error;
        }
    }

    // Get user profile
    static async getProfile(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    // Update user profile
    static async updateProfile(userId, name, phone, passport_number, date_of_birth) {
        try {
            const result = await UserModel.updateProfile(userId, name, phone, passport_number, date_of_birth);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Change password
    static async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Verify old password
            const isPasswordValid = await comparePassword(oldPassword, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid current password');
            }

            // Hash new password
            const hashedPassword = await hashPassword(newPassword);

            // Update password
            const result = await UserModel.updatePassword(userId, hashedPassword);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
