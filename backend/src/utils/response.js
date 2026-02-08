export const successResponse = (res, data = {}, message = "Success", status = 200) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };
  
  export const errorResponse = (message = "Error", status = 500) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
  };
  