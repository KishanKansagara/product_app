const Joi = require('joi');

const addSizeSchema = Joi.object({
    sizeName: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Size name is required',
            'any.required': 'Size name is required'
        })
});

module.exports = { addSizeSchema };

