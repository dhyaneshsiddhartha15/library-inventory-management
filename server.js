const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./utils/database');
const userRouter = require('./Routes/userRoute');
const dotenv = require("dotenv");
const { cloudinaryConnect } = require('./config/cloudinary');
const bookRouter = require('./Routes/bookRoute');
const libraryRouter = require('./Routes/libraryRoute');
const libraryInventoryRouter = require('./Routes/libraryInventoryRoute');
const fileUpload = require("express-fileupload");
const borrowRouter = require('./Routes/borrowRoute');
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

cloudinaryConnect();

db.connect();
app.use('/api/v1/users',userRouter);
app.use('/api/v1/books',bookRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/library',libraryRouter);
app.use('/api/v1/libraries',libraryInventoryRouter);
app.use('/api/v1',borrowRouter);
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});
app.listen(PORT,(req,res)=>{
   console.log(`Server is running at ${PORT}`);
})
