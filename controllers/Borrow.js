const Books = require("../models/Books");
const Users = require("../models/Users");
exports.borrow=async (req,res)=>{
    try{
        const {userid,bookid}=req.body;
        const book=await Books.findById(bookid);
        if(!book){
            return res.status(400).json({
                success:false,
                message:"Books doesn't exist ",
            })
        }
        if(book.borrowed){
            return res.status(400).json({
                success:false,
                message:"Book is already Borrowed",
            })
        }
        const user=await Users.findById(userid);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }
        // if (user.role !== 'Borrower') {
        //     return res.status(403).json({ message: "User is not authorized to borrow books" });
        // }
        book.borrowed=true;
        book.borrower=userid;
        await book.save();
        return res.status(200).json({
            success:true,
            message:"Book Borrowed Successfully",
        })

    }catch(error){
        return res.status(500).json({ message: "Unexpected error", error });
    }
}
exports.returnBook=async (req,res)=>{
    const {id}=req.params;
    console.log("The requested book id is",id);
    try{
     const book=await Books.findById(id);
     if (!book) {
         return res.status(404).json({success:false, message: "Book not found" });
     }
     if (!book.borrowed) {
         return res.status(400).json({success:false, message: "Book is not currently borrowed" });
     }
     book.borrowed = false;
     book.borrower = null;
     await book.save();

     return res.status(200).json({ message: "Book returned successfully", book });


    }catch(error){
        console.log(error);
return res.status(500).json({
    success:false,
    message:"Unexpected Error"
})
    }
}