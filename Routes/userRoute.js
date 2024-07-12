const express=require('express');
const { register, logout, login, checkAuthenticated } = require('../controllers/User');
const isAuthenticated = require('../middlewares/isAuthenticated');
const userRouter=express.Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/checkAuth',isAuthenticated,checkAuthenticated);
module.exports=userRouter;