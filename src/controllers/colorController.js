const Color = require('../models/Color');

const addColor = async (req, res) => {
    try {
        const { colorName } = req.body;

        const colorExists = await Color.findOne({ colorName: { $regex: new RegExp(`^${colorName}$`, 'i') } });
        if (colorExists) {
            return res.status(400).json({
                success: false,
                message: 'Color already exists'
            });
        }

        const color = await Color.create({ colorName });

        res.status(201).json({
            success: true,
            message: 'Color added successfully',
            data: color
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getColors = async (req, res) => {
    try {
        const colors = await Color.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: colors.length,
            data: colors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { addColor, getColors };

