const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    libraryName: {
        type: String,
        required: true,
    },
    books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        quantity: {
            type: Number,
            default: 0,
        },
    }],
    borrowers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Library", librarySchema);
