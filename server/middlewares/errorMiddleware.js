const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose CastError (e.g., invalid ObjectId)
    if (err.name === 'CastError') {
        const message = "Resource Not Found";
        error = new ErrorResponse(message, 404);
    }

    // Duplicate key error (e.g., duplicate email)
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ErrorResponse(message, 400);
    }

    // Final error response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;


/*    wihtout utility Function

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Server Error";

    // Mongoose CastError
    if (err.name === 'CastError') {
        statusCode = 404;
        message = "Resource Not Found";
    }

    // Duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value entered";
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message).join(', ');
        statusCode = 400;
    }

    // Final response
    res.status(statusCode).json({
        success: false,
        error: message
    });
};

module.exports = errorHandler;
*/
