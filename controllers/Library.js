const LIbraries = require('../models/LIbraries');
const Library = require('../models/LIbraries');
exports.getAllLibraries = async (req, res) => {
    try {
        const libraries = await Library.find().populate('books')
        .populate('authors', '-password') 
        .populate('borrowers', '-password');
        return res.status(200).json({
            success: true,
            message: "All libraries fetched successfully",
            libraries: libraries
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
exports.getLibraryById = async (req, res) => {
    try {
        const libraryId = req.params.id;
        const library = await Library.findById(libraryId).populate({
            path: 'books',
            populate: { path: 'borrower' } 
        });
        
        if (!library) {
            return res.status(404).json({
                success: false,
                message: "Library not found.",
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Library details fetched successfully",
            library,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
exports.addLibrary = async (req, res) => {
    try {
        const { libraryName } = req.body;
        
        if (!libraryName) {
            return res.status(400).json({
                success: false,
                message: "Library name is required.",
            });
        }

        const newLibrary = new Library({
            libraryName,
        });

        await newLibrary.save();

        return res.status(201).json({
            success: true,
            message: "Library created successfully",
            library: newLibrary,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};

exports.updateLibrary = async (req, res) => {
    try {
        const libraryId = req.params.id;
        const { libraryName } = req.body;
        
        if (!libraryName) {
            return res.status(400).json({
                success: false,
                message: "Library name is required.",
            });
        }

        const updatedLibrary = await Library.findByIdAndUpdate(
            libraryId,
            { libraryName },
            { new: true }
        );

        if (!updatedLibrary) {
            return res.status(404).json({
                success: false,
                message: "Library not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Library updated successfully",
            library: updatedLibrary,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};

exports.deleteLibrary = async (req, res) => {
    try {
        const libraryId = req.params.id;

        const deletedLibrary = await LIbraries.findByIdAndDelete(libraryId);

        if (!deletedLibrary) {
            return res.status(404).json({
                success: false,
                message: "Library not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Library deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
