const express=require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const borrowerMiddleware = require('../middlewares/borrowerMiddleware');
const { borrow, returnBook } = require('../controllers/Borrow');
const borrowRouter=express.Router();
borrowRouter.post('/borrow',isAuthenticated,borrowerMiddleware,borrow);
borrowRouter.put('/return/:id',isAuthenticated,borrowerMiddleware,returnBook);
module.exports=borrowRouter;