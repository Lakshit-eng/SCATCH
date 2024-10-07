const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Check if the role is 'user'
        if (decoded.role !== 'user') {
            req.flash("error", "Unauthorized access");
            return res.redirect("/"); // Redirect to login page or any other page
        }

        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");
            
            if (!user) {
                req.flash("error", "User not found");
                return res.redirect("/"); // Redirect to login page
            }

        req.user = user;  // Save the user to the request object
        next();  // Call next to continue to the next middleware or route handler
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};
