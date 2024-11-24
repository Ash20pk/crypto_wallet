const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Load env vars
dotenv.config({ path: "./config.env" });

// MongoDB Connection Options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DB_NAME // This will create the DB if it doesn't exist
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, mongoOptions)
  .then(() => console.log(`MongoDB Connected to ${process.env.MONGODB_DB_NAME}`))
  .catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});