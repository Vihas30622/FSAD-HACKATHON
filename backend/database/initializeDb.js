// ============================================================
// DATABASE INITIALIZATION SCRIPT
// Automatically creates tables and inserts sample data
// ============================================================

const { db } = require('../config/database');
const fs = require('fs');
const path = require('path');

// Helper function to run SQL from file
const runSchemaFile = () => {
    return new Promise((resolve, reject) => {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split by semicolon and execute each statement
        const statements = schema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0);

        let completed = 0;

        statements.forEach((statement, index) => {
            if (statement.toUpperCase().startsWith('CREATE INDEX')) {
                // Try to create index, ignore if already exists
                db.run(statement, (err) => {
                    completed++;
                    if (completed === statements.length) {
                        resolve();
                    }
                });
            } else {
                db.run(statement, (err) => {
                    if (err && !err.message.includes('already exists')) {
                        console.warn(`Warning at statement ${index}: ${err.message}`);
                    }
                    completed++;
                    if (completed === statements.length) {
                        resolve();
                    }
                });
            }
        });
    });
};

// Initialize database
async function initializeDatabase() {
    console.log('Initializing SQLite database...');
    try {
        await runSchemaFile();
        console.log('✓ Database initialized successfully');
        return true;
    } catch (error) {
        console.error('✗ Database initialization failed:', error);
        return false;
    }
}

module.exports = { initializeDatabase };
