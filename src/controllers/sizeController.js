const Size = require('../models/Size');

const addSize = async (req, res) => {
    try {
        const { sizeName } = req.body;

        const sizeExists = await Size.findOne({ sizeName: { $regex: new RegExp(`^${sizeName}$`, 'i') } });
        if (sizeExists) {
            return res.status(400).json({
                success: false,
                message: 'Size already exists'
            });
        }

        const size = await Size.create({ sizeName });

        res.status(201).json({
            success: true,
            message: 'Size added successfully',
            data: size
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getSizes = async (req, res) => {
    try {
        const sizes = await Size.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: sizes.length,
            data: sizes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { addSize, getSizes };

