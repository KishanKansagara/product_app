const Joi = require('joi');

const addProductSchema = Joi.object({
    productName: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Product name is required',
            'any.required': 'Product name is required'
        }),
    description: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Description is required',
            'any.required': 'Description is required'
        }),
    color: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.empty': 'Color is required',
            'any.required': 'Color is required',
            'string.pattern.base': 'Invalid color ID'
        }),
    size: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.empty': 'Size is required',
            'any.required': 'Size is required',
            'string.pattern.base': 'Invalid size ID'
        }),
    category: Joi.string()
        .required()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.empty': 'Category is required',
            'any.required': 'Category is required',
            'string.pattern.base': 'Invalid category ID'
        })
});

module.exports = { addProductSchema };

