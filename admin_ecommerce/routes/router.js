        const express = require('express');
        const router = express.Router();
        const adminController = require("../controller/adminController");
        const categoryController = require("../controller/categoryController"); // Renamed for clarity
        const productController = require('../controller/productController')
        const userController = require('../controller/userController')
        const indexController = require('../controller/indexController')
        const upload = require('../config/multerSetup'); // Ensure this file is configured for image uploads

        // Display routes
        router.get('/admin', adminController.dashboard);
        router.get('/category-add', adminController.category_add);
        router.get('/product-add', productController.getAddProductPage); 
        router.get('/product-list', productController.getAllProduct);// Use the method from productController

        router.get('/category-list', categoryController.getAllCategories); // Ensure only one handler for /category-list
        router.post('/category-list/delete/:id', categoryController.deleteCategories);
        // Categories routes
        router.post('/add-category', upload.single('thumbnail_image'), categoryController.createCategory);
        router.post('/add-product', upload.single('image'), productController.createProducts);
        router.post('/product-list/delete/:id', productController.deleteProduct);
        router.get('/edit-product/:id', productController.editProduct);
        router.post('/edit-product/:id', upload.single('image'), productController.updateProducts);
        module.exports = router;


          // Index

          router.get('/', indexController.home);



          router.get('/login', userController.users); // Render login view
          router.get('/register', userController.registration); // Render registration view



          router.post('/register', userController.registrationHandler); // Handle registration
          router.post('/login', userController.loginHandler); // Handle login




module.exports = router;