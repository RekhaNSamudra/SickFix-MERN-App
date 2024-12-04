import jwt from "jsonwebtoken";

// admin authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.json({success: false, message: "Not Authorised... Login again",
      });
    }

    // Split the header to get the token part
    const docToken = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    if (!docToken) {
      return res.json({ success: false, message: "Not Authorised... Login again",
      });
    }
    // Verify the token
    const token_decode = jwt.verify(docToken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { authDoctor };
