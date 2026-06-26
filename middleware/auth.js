const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // 1. Extract the token from the HTTP Authorization header
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Expecting format: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Malformed token." });
  }

  try {
    // 2. Cryptographically verify the token using your hidden .env secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the verified user details to the request object
    req.user = verified;
    
    // 3. Pass control to the next function in line (the controller)
    next();
  } catch (err) {
    // If the token was altered by a hacker, it fails here
    res.status(403).json({ error: "Invalid or expired token." });
  }
};