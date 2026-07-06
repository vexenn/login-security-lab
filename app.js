require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// routes
app.use("/users", authRoutes); // Exposes /users/register and /users/login
app.use("/tasks", taskRoutes); // Mount /tasks to catch all Task CRUD operations

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});