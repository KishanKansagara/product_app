const Joi = require('joi');

const updateProfileSchema = Joi.object({
    name: Joi.string()
        .trim()
        .messages({
            'string.empty': 'Name cannot be empty'
        }),
    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Please enter a valid email'
        }),
    mobileNumber: Joi.string()
        .trim()
        .messages({
            'string.empty': 'Mobile number cannot be empty'
        })
});

module.exports = { updateProfileSchema };

