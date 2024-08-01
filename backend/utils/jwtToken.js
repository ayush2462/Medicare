import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user, message, statusCode, res) => {
  try {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
    const cookieExpires = process.env.COOKIE_EXPIRES
      ? parseInt(process.env.COOKIE_EXPIRES)
      : 7; // Default to 7 days if COOKIE_EXPIRES is not defined

    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
        httpOnly: true, 
       
      })
      .json({
        success: true,
        message,
        token,
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token generation failed",
      error: error.message,
    });
  }
};
