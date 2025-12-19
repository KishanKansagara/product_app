const Joi = require('joi');

const addCategorySchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Category name is required',
            'any.required': 'Category name is required'
        })
});

module.exports = { addCategorySchema };

