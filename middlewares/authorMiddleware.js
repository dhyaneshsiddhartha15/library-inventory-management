const authorMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'Author' || req.user.role.includes('Author'))) {
        return next(); 
    }  else {
        return res.status(403).json({ message: "Only Author are allowed to perform this action." });
    }
};

module.exports = authorMiddleware;
