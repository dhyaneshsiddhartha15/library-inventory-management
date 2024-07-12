const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
type:String,
required:true,
trim:true,
    },
    email:{
type:String,
required:true,
trim:true,
    },
    password:{
type:String,
required:true,
trim:true,
    },
    role:[{
        type:String,
        enum:['Author','Borrower','Admin'],
        default:'Borrower'
    }]
},{
    timestamps:true,
})
module.exports=mongoose.model("User",userSchema);