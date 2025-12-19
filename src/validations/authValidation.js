const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    mobileNumber: Joi.string()
        .required()
        .trim()
        .messages({
            'string.empty': 'Mobile number is required',
            'any.required': 'Mobile number is required'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .lowercase()
        .trim()
        .messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
});

module.exports = { signupSchema, loginSchema };

