const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Welcome to TaskFlow API"));

//Define Routes
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/materials", require("./routes/materials"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
