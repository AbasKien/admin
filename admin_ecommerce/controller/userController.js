// userController.js
const userModel = require('../model/userModel');

const DEFAULT_ADMIN = {
    email: 'admin@gmail.com',
    password: 'admin123',
};

const userController = {
    // Render login view
    users: (req, res) => {
        res.render('users/login', { error: null });
    },
    
    // Render registration view
    registration: (req, res) => {
        res.render('users/registration', { error: null });
    },

    // Handle user registration
    registrationHandler: (req, res) => {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        userModel.findByEmail(email, (err, users) => {
            if (err) {
                return res.status(500).send('Error checking user.');
            }
            if (users.length > 0) {
                // Email already exists
                return res.render('users/registration', { error: 'This email is already registered.' });
            }

            // Insert user into the database if email is not taken
            userModel.create({ name, email, password }, (err, result) => {
                if (err) {
                    return res.status(500).send('Error registering user.');
                }
                res.redirect('/login'); // Redirect to login after registration
            });
        });
    },

    // Handle user login
    loginHandler: (req, res) => {
        console.log(req.body);
    
        const { email, password } = req.body;
    
        // Check for default admin credentials
        if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
            req.session.userId = 'admin';
            return res.redirect('/admin');
        }
    
        userModel.findByEmail(email, (err, users) => {
            console.log(users);
    
            if (err || users.length === 0) {
                return res.render('users/login', { error: 'This account is not registered.' });
            }
    
            const user = users[0];
    
            if (user.password !== password) {
                return res.status(401).render('users/login', { error: 'Incorrect password.' });
            }
    
            req.session.userId = user.id; // Store user id in session
            res.redirect('/'); // Redirect to index or user dashboard
        });
    }
};

module.exports = userController;
