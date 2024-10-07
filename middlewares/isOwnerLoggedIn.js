const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owners-model");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/owners"); // Redirect to owner login page
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Check if the decoded token indicates that the user is an owner
        if (decoded.role !== 'owner') {
            req.flash("error", "Unauthorized access");
            return res.redirect("/owners/admin"); // Redirect to admin page if user is not an owner
        }

        let owner = await ownerModel.findOne({ email: decoded.email })
        .select("-password");

        if (!owner) {
            req.flash("error", "Owner not found");
            return res.redirect("/"); // Redirect to login page
        }

        req.owner = owner; // Save the owner to the request object
        next(); // Call next to continue to the next middleware or route handler
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/"); // Handle error by redirecting
    }
};
