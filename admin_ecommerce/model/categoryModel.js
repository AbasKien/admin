// productModel.js
const db = require('../config/db');

const categories = {
    create: (data, callback) => {
        const query = "INSERT INTO categories (category_name, thumbnail_image, description) VALUES (?, ?, ?)";
        db.query(query, [data.category_name, data.thumbnail_image, data.description], callback);
    },
    
    getall: (callback) => {
        const query = "SELECT * FROM categories";
        db.query(query, callback);
    },

    deleteCategories: (id, callback) => {
        const query = "DELETE from categories WHERE category_id = ?";
        db.query(query, [id], callback);
    }
};

module.exports = categories;
