const jwt = require("jsonwebtoken");
const authDB = require("../Model/authModel");

const authGround = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const varifyToken = jwt.verify(token, process.env.LOGIN_TOKEN_KEY);
            const email = varifyToken.email;
            const user = await authDB.findOne({ email });
            req.user = user
            next();
        }

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized users',
            error: error.message
        })
    }
}

module.exports = authGround;