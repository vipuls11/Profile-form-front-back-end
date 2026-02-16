const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profile.routes.js");

const DB_NAME = "ProfileDB";
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}?appName=seriesCluster`)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(8000, () => console.log("Server running on 8000"));
  })
  .catch(err => console.log(err));

app.use("/api", profileRoutes);
