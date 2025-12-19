const Joi = require('joi');

const addColorSchema = Joi.object({
    colorName: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Color name is required',
            'any.required': 'Color name is required'
        })
});

module.exports = { addColorSchema };

