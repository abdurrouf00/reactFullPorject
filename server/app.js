const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const path = require("path");

const authRoutes = require("./router/authRoutes");
const roomRoutes = require("./router/roomRoutes");
const contactRoutes = require("./router/contactRoutes");

const messageRoute = require("./router/messageRoute");


const app = express();

app.use(cors({
  origin: 'https://react.igmbd.org',
  
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Static folder for images
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // 👍 এটা সঠিক

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

app.use("/api/contact", messageRoute);


app.get("/", (req, res) => {
  res.send("<h1>Welcome to my fullstack hotel project</h1>");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("<h1>404 - Not Found</h1>");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("<h1>500 - Server Error</h1>");
});

module.exports = app;
