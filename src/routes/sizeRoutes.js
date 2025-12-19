const express = require('express');
const router = express.Router();
const { addSize, getSizes } = require('../controllers/sizeController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addSizeSchema } = require('../validations/sizeValidation');

router.post('/', protect, validate(addSizeSchema), addSize);

router.get('/', protect, getSizes);

module.exports = router;
