import jwt from "jsonwebtoken";

// admin authentication middleware
const authUser = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not Authorised... Login again",
      });
    }

    // Split the header to get the token part
    const userToken = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    if (!userToken) {
      return res.json({
        success: false,
        message: "Not Authorised... Login again",
      });
    }
    // Verify the token
    const token_decode = jwt.verify(userToken, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { authUser };
