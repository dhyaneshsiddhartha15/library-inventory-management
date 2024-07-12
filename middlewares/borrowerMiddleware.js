const borrowerMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'Borrower' || req.user.role.includes('Borrower'))) {
        
        return next();
    } else {
        return res.status(403).json({ message: "Only borrowers are allowed to perform this action." });
    }
};

module.exports = borrowerMiddleware;
