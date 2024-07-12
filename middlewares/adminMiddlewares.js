const adminMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role.includes('Admin'))) {
        return next(); 
    } else {
        return res.status(403).json({ message: "Only Admins are allowed to perform this action." });
    }
};

module.exports = adminMiddleware;
