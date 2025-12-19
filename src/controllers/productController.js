const Product = require('../models/Product');
const Category = require('../models/Category');
const Color = require('../models/Color');
const Size = require('../models/Size');

const addProduct = async (req, res) => {
    try {
        const { productName, description, color, size, category } = req.body;

        const [categoryExists, colorExists, sizeExists] = await Promise.all([
            Category.findById(category),
            Color.findById(color),
            Size.findById(size)
        ]);

        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category ID'
            });
        }

        if (!colorExists) {
            return res.status(400).json({
                success: false,
                message: 'Invalid color ID'
            });
        }

        if (!sizeExists) {
            return res.status(400).json({
                success: false,
                message: 'Invalid size ID'
            });
        }

        const images = req.files ? req.files.map(file => file.path) : [];

        const product = await Product.create({
            productName,
            description,
            color,
            size,
            category,
            images
        });

        const populatedProduct = await Product.findById(product._id)
            .populate('color', 'colorName')
            .populate('size', 'sizeName')
            .populate('category', 'name');

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: populatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const { category, color, size, productName, page = 1, limit = 10 } = req.query;

        const filter = {};

        if (productName) {
            filter.productName = { $regex: productName, $options: 'i' };
        }

        if (category) {
            const categoryDoc = await Category.findOne({ 
                name: { $regex: category, $options: 'i' } 
            });
            if (categoryDoc) {
                filter.category = categoryDoc._id;
            } else {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    totalPages: 0,
                    currentPage: parseInt(page),
                    data: []
                });
            }
        }

        if (color) {
            const colorDoc = await Color.findOne({ 
                colorName: { $regex: color, $options: 'i' } 
            });
            if (colorDoc) {
                filter.color = colorDoc._id;
            } else {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    totalPages: 0,
                    currentPage: parseInt(page),
                    data: []
                });
            }
        }

        if (size) {
            const sizeDoc = await Size.findOne({ 
                sizeName: { $regex: size, $options: 'i' } 
            });
            if (sizeDoc) {
                filter.size = sizeDoc._id;
            } else {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    totalPages: 0,
                    currentPage: parseInt(page),
                    data: []
                });
            }
        }

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .populate('color', 'colorName')
            .populate('size', 'sizeName')
            .populate('category', 'name')
            .select('_id productName description color size category')
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: -1 });

        const formattedProducts = products.map(product => ({
            _id: product._id,
            productName: product.productName,
            description: product.description,
            colorName: product.color ? product.color.colorName : null,
            sizeName: product.size ? product.size.sizeName : null,
            categoryName: product.category ? product.category.name : null
        }));

        res.status(200).json({
            success: true,
            count: formattedProducts.length,
            totalPages: Math.ceil(total / limitNum),
            currentPage: pageNum,
            total: total,
            data: formattedProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { addProduct, getProducts };

