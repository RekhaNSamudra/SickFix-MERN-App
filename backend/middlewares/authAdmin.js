import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
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
    const adminToken = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    if (!adminToken) {
      return res.json({
        success: false,
        message: "Not Authorised... Login again",
      });
    }
    // Verify the token
    const tokenDecode = jwt.verify(adminToken, process.env.JWT_SECRET);

    // Check if the decoded token matches expected admin credentials
    const expectedAdminToken =
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    if (tokenDecode !== expectedAdminToken) {
      return res.json({
        success: false,
        message: "Not Authorised... Invalid email or password",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { authAdmin };
