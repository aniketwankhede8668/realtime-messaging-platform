export const errorHandler = ( err, req, res, next ) => {

  let statusCode = 500;

  if ( err.message.includes("Please") ) {
    statusCode = 400;
  }

  if ( err.message.includes("mismatch")) {
    statusCode = 401;
  }

  if ( err.message.includes("already exists")) {
    statusCode = 409;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message
  });
};