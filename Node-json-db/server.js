const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3500;

const filePath = path.join(__dirname, "perfumes.json");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/api/fragrances", (req, res) => {
  const { queryBrands, queryGender, search } = req.query;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data file" });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (jsonErr) {
      return res.status(500).json({ error: "Failed to parse data file" });
    }

    const filteredParfums = parsedData.perfumes.filter((item) => {
      const fullName = `${item.brand} ${item.name}`.toLowerCase();

      const matchesSearch =
        !search ||
        search
          .toLowerCase()
          .split(" ")
          .every((searchWord) =>
            fullName.split(" ").some((word) => word.startsWith(searchWord))
          );
      return matchesSearch;
    });

    res.json({ perfumes: filteredParfums });
  });
});

app.get("/api/search", (req, res) => {
  const { search } = req.query;
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
