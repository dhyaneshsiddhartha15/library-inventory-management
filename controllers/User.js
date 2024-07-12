const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config();;
const isAuthenticated = require("../middlewares/isAuthenticated");
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please provide all details",
            });
        }
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({
            success: false,
            message: "Unexpected error",
            error: error.message, 
        });
    }
};
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all details for Login",
            })
        }
        const user=await Users.findOne({email});
        if(!email){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist",
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user?.email,
                id:user?._id,
            };
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });
            console.log("Token is",token);
            const options={
                expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            };
            return res.cookie("token",token,options).json({
                success:true,
                message:"User Logged in Successfully,"
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Password Incorrect",
            })
        }

    }catch(error){
        console.log(error);
return res.status(500).json({
    success:false,
    message:"Unexpected error"
})
    }
} 
exports.logout=async(req,res)=>{
    try{ 
       res.cookie("token","",{
            maxAge:1,
            
        });
        res.status(200).json({
            message:"User logged out sucessfully"
        })
       

    }catch(error){
return res.status(500).json({
    success:true,
    message:"Erro occured",
})
    }
};
exports.checkAuthenticated=async (req,res)=>{
    const decoded=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
    
    try{
        if(decoded){
            res.json({
                isAuthenticated:true,
            })
        }else{
            res.json({
                isAuthenticated:false,
            })
        }
    }catch(error){
console.log(error);
return res.status(404).json({
    success:false,
    message:"Unexpected Error"
})
    }
   

}