const db = require('../config/db');

const userModel = {
    // Register a new user
    create: (data, callback) => {
        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(query, [data.name, data.email, data.password], callback);
    },  

    // Get user by email (for login)
    findByEmail: (email, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], callback);
    },
    getAll:(callback) =>{
        const query = "Select * FROM users";
        db.query(query, callback);
    },
};

module.exports = userModel;
