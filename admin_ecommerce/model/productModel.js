const { query } = require('express');
const db = require('../config/db');

const products = {
    create: (data, callback) => {
        const query = "INSERT INTO products (product_name, image, description, category_id, price, stock) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(query, [data.product_name, data.image, data.description, data.category_id, data.price, data.stock], (err, results) => {
            if (err) {
                console.error('Database Error:', err); // Log the database error
            }
            callback(err, results); // Always call the callback
        });
    },
    getAllCategories: (callback) => {
        db.query('SELECT category_id, category_name FROM categories', (err, results) => {
            callback(err, results); // Pass results to the callback
        });
    },
    getAllProducts: (callback)=>{
        const query =   'SELECT products.id, products.product_name, products.image, products.description, products.price, products.stock, categories.category_name AS category_name FROM products JOIN categories ON products.category_id = categories.category_id ;'
        db.query(query, callback);
    },
    deleteProducts: (id, callback)=>{
        const query = 'delete from products where id = ?';
        db.query(query, [id], callback)
    },
    update: (id, data, callback) => {
        const query = "UPDATE products SET product_name = ?, image = ?, description = ?, category_id = ?, price = ?, stock = ? WHERE id = ?";
        db.query(query, [data.product_name, data.image, data.description, data.category_id, data.price, data.stock, id], callback);
    },

    getProductById: (id, callback) => {
        const query = `
            SELECT products.id, products.product_name, products.image, products.description, products.price, products.stock,
                   categories.category_name AS category_name
            FROM products
            JOIN categories ON products.category_id = categories.category_id
            WHERE products.id = ?;
        `;
        db.query(query, [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0] || null); // Return the first product or null if not found
        });
    }
}

module.exports = products;
