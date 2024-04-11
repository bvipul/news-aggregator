const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Unauthorised" });
  }
};
