require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 4006,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/encriptionDemo",
  },
};

module.exports = dev;
