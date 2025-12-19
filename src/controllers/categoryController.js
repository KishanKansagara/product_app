const Category = require('../models/Category');

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const categoryExists = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }

        const category = await Category.create({ name });

        res.status(201).json({
            success: true,
            message: 'Category added successfully',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { addCategory, getCategories };

