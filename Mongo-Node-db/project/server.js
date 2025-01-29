const express = require("express");
const mongoose = require("mongoose");
const app = express();

PORT = 3500;

const volumeAndPriceSchema = new mongoose.Schema({
  volume: String,
  price: String,
});

const fragranceSchema = new mongoose.Schema({
  id: String,
  brand: String,
  name: String,
  gender: String,
  mainVolumeIndex: Number,
  volumesAndPrices: [volumeAndPriceSchema],
  photo: String,
});

const Fragrance = mongoose.model("Fragrance", fragranceSchema);

mongoose
  .connect(
    "mongodb+srv://server:Password@cluster0.io7bh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(`error : ${err}`));

app.post("/add", async (req, res) => {
  const { fragrance } = req.query;

  const newFragrance = new Fragrance(fragrance);
  newFragrance
    .save()
    .then(() => res.status(201).send("Fragrance added successfully"))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/fragrances", async (req, res) => {
  const { brands, search, genders, page = 1 } = req.query;
});

app.get("/search", async (req, res) => {
  const { search } = req.query;
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
