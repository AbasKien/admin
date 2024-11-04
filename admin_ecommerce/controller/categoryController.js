const category = require('../model/categoryModel'); // Rename model import if needed

const categoryController = {
    createCategory: (req, res) => {
        console.log(req.file); 
        console.log(req.body); // Debugging form data

        const { category_name, description } = req.body;
        const thumbnailImage = req.file.path.replace(/\\/g, '/'); // Correct path handling for Windows
        
        category.create({
            category_name,
            description,
            thumbnail_image: thumbnailImage
        }, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding category');
            }
            res.redirect('/category-list'); // Redirect to list page after adding
        });
    },
    getAllCategories: (req, res) => {
        category.getall((err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving categories');
            }
            res.render('admin/category-list', { categories: result });
        });
    },
    deleteCategories: (req, res) =>{
        const { id } = req.params; 
        category.deleteCategories(id, (err) => {
            if(err){
                return res.status(500).send('Error deleting product');
            }
            res.redirect('/category-list'); 
        })

    }
};

module.exports = categoryController;
