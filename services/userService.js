const { runQuery } = require("../database/db");

// Finds a user in the LAB_USERS table by their username

async function findUserByUsername(username) {
    const sql = 'SELECT USERNAME, PASSWORD FROM LAB_USERS WHERE USERNAME = :username';
    const result = await runQuery(sql, [username]);
    return result.rows && result.rows.length > 0 ? result.rows[0] : null;
}

// Inserts a new user with a pre-hashed password into the database

async function createUser(username, hashedPassword) {
    const sql = 'INSERT INTO LAB_USERS (USERNAME, PASSWORD) VALUES (:username, :password)';
    return await runQuery(sql, [username, hashedPassword]);
}

module.exports = {
    findUserByUsername,
    createUser
};