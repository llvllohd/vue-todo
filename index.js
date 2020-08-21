const express = require("express");
const serveStatic = require("serve-static");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

// const todo = require("./routes/todo");
// const { patch } = require("./routes/todo");
// app.use("/todo", todo);
// routes
const todo = require("./routes/todo");
// const { path } = require("./routes/todo");
app.use("/api/todo", todo);

if (process.env.NODE_ENV === "production") {
  app.use("/", serveStatic(path.join(__dirname, "/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "/dist/index.html"));
  });
}

const db = "medb";
const uri = process.env.mongodb || `mongodb://localhost:27017/${db}`;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      // process.exit(1);
      console.log("Unable to connect to the " + db);
    } else {
      console.log("Successfully connected to the " + db);
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is running on port " + port);
});
