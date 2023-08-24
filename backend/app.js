require("dotenv").config();
const express = require("express");
// const cors = require("cors");

const connectDB = require("./db");
connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// app.use(cors());

// Available Routes
app.use("/game/getWord", require("./routes/getWord"));
app.use("/game/getGame", require("./routes/getGame"));
app.use("/game/appendWord", require("./routes/appendWord"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
