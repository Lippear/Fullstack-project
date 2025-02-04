import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3500;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const volumeAndPriceSchema = new mongoose.Schema({
  volume: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
});

const fragranceSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  mainVolumeIndex: { type: Number, required: true, min: 0 },
  volumesAndPrices: { type: [volumeAndPriceSchema], required: true },
  photo: { type: String, required: true },
});

const Fragrance = mongoose.model("Fragrance", fragranceSchema, "Fragrances");

mongoose
  .connect(
    "mongodb+srv://server:Password@cluster0.io7bh.mongodb.net/LippearShop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    console.log("DB connected");
  })
  .catch(console.error);

app.get("/api/fragrances", async (req, res) => {
  try {
    const { brand, gender, search, page = 1 } = req.query;
    const fragranceLimitOnPage = 3;
    const searchWords = search
      ? search
          .trim()
          .split(/\s+/)
          .map((word) => new RegExp(word, "i"))
      : [];
    const countToSkip = (page - 1) * fragranceLimitOnPage;
    const DBfilter = { $and: [] };

    if (brand) DBfilter.$and.push({ brand: new RegExp(brand, "i") });
    if (gender) DBfilter.$and.push({ gender: gender });
    if (searchWords.length > 0) {
      DBfilter.$and.push({
        $and: searchWords.map((word) => ({
          $or: [{ brand: word }, { name: word }],
        })),
      });
    }

    const fragrances = await Fragrance.find(DBfilter)
      .skip(countToSkip)
      .limit(fragranceLimitOnPage);
    const itemsCount = await Fragrance.countDocuments(DBfilter);
    const pagesCount = Math.ceil(itemsCount / fragranceLimitOnPage);

    res.json({ fragrances, pagesCount });
  } catch (error) {
    res.status(500).json({ error: "Search failed", details: error.message });
  }
});

app.get("/api/searchQuery", async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.json({ searchResults: [] });
    }

    const searchWords = search
      .trim()
      .split(/\s+/)
      .map((word) => new RegExp(word, "i"));

    const results = await Fragrance.find({
      $and: searchWords.map((word) => ({
        $or: [{ brand: word }, { name: word }],
      })),
    })
      .limit(8)
      .lean();

    const searchResults = results.map(
      (result) => `${result.brand} ${result.name}`
    );

    res.json({
      searchResults,
      success: true,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      error: "Search failed",
      details: error.message,
      success: false,
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
