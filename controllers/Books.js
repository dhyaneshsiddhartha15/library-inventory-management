const Books = require("../models/Books");
const LIbraries = require("../models/LIbraries");
const { uploadImageToCloudinary } = require("../utils/imageUplader"); 
require("dotenv").config();
exports.addBook = async (req, res) => {
    try {
        const { title, author, library } = req.body;
        const coverImage = req.files.coverImage;

        if (!coverImage) {
            return res.status(400).json({
                success: false,
                message: "Cover image file is required."
            });
        }

        console.log("coverImage:", coverImage);
        console.log("coverImage.tempFilePath:", coverImage.tempFilePath);

        const uploadedImage = await uploadImageToCloudinary(coverImage.tempFilePath, process.env.FOLDER_NAME);

        if (!uploadedImage || !uploadedImage.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed. Please try again."
            });
        }

        const newBook = new Books({
            title,
            author,
            library,
            coverImage: uploadedImage.secure_url,
        });

        const savedBook = await newBook.save();

        const libraryDoc = await LIbraries.findById(library);
        if (!libraryDoc) {
            return res.status(404).json({
                success: false,
                message: "Library not found"
            });
        }

        libraryDoc.books.push(savedBook._id);
        await libraryDoc.save();

        return res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: savedBook
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
};
exports.updateBook = async (req, res) => {
    try {

        const { title, author, library } = req.body;
        const coverImage = req.files ? req.files.coverImage : null;
        const { id } = req.params;
        console.log("Id" ,id) 

        if (!title || !author || !library) {
            return res.status(400).json({
                success: false,
                message: "Title, author, and library are required."
            });
        }

        let updatedFields = { title, author, library };

        if (coverImage) {
            const uploadedImage = await uploadImageToCloudinary(coverImage.tempFilePath, process.env.FOLDER_NAME);
            
            if (!uploadedImage || !uploadedImage.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed. Please try again."
                });
            }

            updatedFields.coverImage = uploadedImage.secure_url;
        }

        const updatedBook = await Books.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
};
exports.fetchAllBooks = async (req, res) => {
    try {
        const books = await Books.find();
        return res.status(200).json({
            success: true,
            message: "All books fetched successfully",
            data: books
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred. Please try again later."
        });
    }
};
exports.fetchBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findById(id)
        .populate({
            path: "author",
            select: "-password"
        })
        .populate({
            path: "library",
            select: "-password"
        });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book details fetched successfully",
            data: book
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred. Please try again later."
        });
    }
};


exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        // await book.save();

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error occurred. Please try again later."
        });
    }
};
