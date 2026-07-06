const { runQuery } = require("../database/db");

// Finds a user in the LAB_USERS table by their username

async function findUserByEmail(email) {
    const sql = 'SELECT user_id, name, email, password_hash FROM users WHERE email = :email';
    const result = await runQuery(sql, [email]);
    return result.rows && result.rows.length > 0 ? result.rows[0] : null;
}

// Inserts a new user with a pre-hashed password into the database

async function createUser(name, email, hashedPassword) {
    const sql = 'INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)';
    return await runQuery(sql, [name, email, hashedPassword]);
}

module.exports = {
    findUserByEmail,
    createUser
};