const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB database
const uri = "mongodb+srv://tsachiel4:Bx5X7PKrkzj37743@cluster0.pmr5vxp.mongodb.net/test";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) {
    console.error("MongoDB connection error", err);
  } else {
    console.log("MongoDB connected");
  }
});

// Middleware to parse incoming JSON requests

// Endpoint to get options
app.get("/getOptions", async (req, res) => {
  console.log('here');
  try {
    const db = client.db("main");
    const collection = db.collection("options");
    const options = await collection.findOne({});
    res.send(options);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
