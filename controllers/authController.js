const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Defensive Check: Prevent unique constraint violations early
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Secure password handling (hashing, never plain text)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user details to Oracle database
    await userService.createUser(name, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Registration Error: ", err);
    res.status(500).json({ error: "Internal server error during registration." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Call the updated service function instead of writing raw SQL
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    /* CRITICAL INDEX REALIGNMENT
      Query maps to: [0]: user_id, [1]: name, [2]: email, [3]: password_hash
      We handle both Object keys or Array indexes depending on your node-oracledb outFormat settings.
    */
    const dbPasswordHash = user.PASSWORD_HASH || user[3];
    const userId = user.USER_ID || user[0];
    const userName = user.NAME || user[1];

    const isMatch = await bcrypt.compare(password, dbPasswordHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId, name: userName, email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Login Error: ", err);
    res.status(500).json({ error: "Server error" });
  }
};