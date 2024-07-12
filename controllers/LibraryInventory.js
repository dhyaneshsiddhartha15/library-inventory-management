const Books = require("../models/Books");
const LIbraries = require("../models/LIbraries");

exports.addlibraryInventory=async (req,res)=>{
    try{
const libraryid=req.params.id;
const {title,author,borrower}=req.body;
if (!title || !author || !borrower) {
    return res.status(400).json({
        success: false,
        message: "Title, author, and borrower are required.",
    });
}
const newBook=new Books({
    title,
    author,
    borrower,
    library:libraryid,
})
await newBook.save();
await LIbraries.findByIdAndUpdate(libraryid,{$push:{books:newBook._id}},{new:true});
return res.status(200).json({
    success:true,
    message:"Book added to Library Inventory Sucesfully",
    book:newBook,
})
    }catch(error)
 
    {
           console.log(error); 
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
}
exports.removeFromLibraryInventory = async (req, res) => {
    try {
        const libraryId = req.params.id;
        console.log("Libray i dis",libraryId)
        
        const bookId = req.params.bookid;
        console.log("Book",bookId);
        const library = await LIbraries.findByIdAndUpdate(
            libraryId,
            { $pull: { books: bookId } },
            { new: true }
        );

        if (!library) {
            return res.status(404).json({
                success: false,
                message: "Library not found.",
            });
        }

      
        const deletedBook = await Books.findByIdAndDelete(bookId);

        // if (!deletedBook) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Book not found.",
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: "Book removed from library inventory successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
exports.getLibraryInventory = async (req, res) => {
    try {
        const libraryId = req.params.id;

        const library = await LIbraries.findById(libraryId).populate({
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
            message: "Library inventory fetched successfully",
            inventory: library.books,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
};
