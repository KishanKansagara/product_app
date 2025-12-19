const express = require('express');
const router = express.Router();
const { addColor, getColors } = require('../controllers/colorController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addColorSchema } = require('../validations/colorValidation');

router.post('/', protect, validate(addColorSchema), addColor);

router.get('/', protect, getColors);

module.exports = router;
