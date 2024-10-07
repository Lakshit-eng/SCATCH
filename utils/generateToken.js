const jwt = require("jsonwebtoken");
const generateTokenUser = (user) => {
    
    return jwt.sign({ email: user.email, id: user._id ,role: 'user' }, process.env.JWT_KEY);
}
const generateTokenOwner = (owner) => {
    
    return jwt.sign({ email: owner.email, id: owner._id ,role: 'owner' }, process.env.JWT_KEY);
}

module.exports={
    generateTokenUser,
    generateTokenOwner

}