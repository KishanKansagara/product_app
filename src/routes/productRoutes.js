const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addProductSchema } = require('../validations/productValidation');
const { uploadMultiple } = require('../utils/fileUpload');

router.post('/', protect, (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
}, validate(addProductSchema), addProduct);

router.get('/', protect, getProducts);

module.exports = router;
