const jwt = require("jsonwebtoken");
import "dotenv/config";

const __secret = process.env.API_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  if (req.path.startsWith("/*")) {
    return next();
  }

  jwt.verify(token, __secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
