const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
         type: String,
          required: true 
        },
    author: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Users', 
         required: true },
    library: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Library', 
        required: true },
    borrowed: {
        type: Boolean, 
        default: false
     },
    borrower: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Users', 
         default: null },
    coverImage: {
         type: String 
        }
}, { 
    timestamps: true 
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
