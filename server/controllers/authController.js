const userModel = require("../models/userModel");
const errorResponse_utility = require("../utils/errorResponse"); // Make sure this path is correct
// If sendToken is defined in the same file, no need to require. If separate, import it.


// Send JWT Token
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(); // corrected method name and usage
    res.status(statusCode).json({
        success: true,
        token
    });
};

exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse_utility("Email is already registered", 400));
        }

        const user = await userModel.create({ username, email, password });
        sendToken(user, 201, res);

    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorResponse_utility("Please provide email and password", 400));
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse_utility("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password); // fixed
        if (!isMatch) {
            return next(new errorResponse_utility("Invalid credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: "Logout Successfully"
    });
};
