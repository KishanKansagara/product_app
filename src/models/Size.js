const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    sizeName: {
        type: String,
        required: [true, 'Size name is required'],
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Size', sizeSchema);

