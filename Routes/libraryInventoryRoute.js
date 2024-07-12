const express=require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { addlibraryInventory, getLibraryInventory, removeFromLibraryInventory } = require('../controllers/LibraryInventory');
const adminMiddleware = require('../middlewares/adminMiddlewares');
const libraryInventoryRouter=express.Router();
libraryInventoryRouter.post('/:id/inventory/add',isAuthenticated,adminMiddleware,addlibraryInventory);
libraryInventoryRouter.get(' /:id/inventory/fetch',isAuthenticated,adminMiddleware,adminMiddleware,getLibraryInventory);
libraryInventoryRouter.delete('/:id/inventory/:bookid/delete',adminMiddleware,removeFromLibraryInventory);
module.exports=libraryInventoryRouter;