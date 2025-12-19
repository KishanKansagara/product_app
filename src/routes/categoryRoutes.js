const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addCategorySchema } = require('../validations/categoryValidation');

router.post('/', protect, validate(addCategorySchema), addCategory);

router.get('/', protect, getCategories);

module.exports = router;
