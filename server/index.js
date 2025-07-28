const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas is connected");
    app.listen(config.app.port, () => {
      console.log(`Server running at http://localhost:${config.app.port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
