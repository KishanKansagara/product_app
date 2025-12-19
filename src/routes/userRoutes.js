const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { updateProfileSchema } = require('../validations/userValidation');

router.get('/profile', protect, getProfile);

router.put('/profile', protect,validate(updateProfileSchema), updateProfile);

module.exports = router;
