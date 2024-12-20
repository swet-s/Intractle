require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
connectDB();

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

// Available Routes
app.use("/game", require("./routes/game"));
app.use("/text", require("./routes/text"));
app.use("/word", require("./dev/word-db"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
