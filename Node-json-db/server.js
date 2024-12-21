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

app.get("/api/searchQuery", (req, res) => {
  const { search } = req.query;

  if (!search || !search.trim()) {
    return res.json({ searchResults: [] });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const perfumes = JSON.parse(data).perfumes;
      const searchLower = search.toLowerCase();

      // Найти бренды, соответствующие запросу
      const brands = perfumes
        .map((perfume) => perfume.brand)
        .filter((brand, index, self) =>
          brand.toLowerCase().startsWith(searchLower) && self.indexOf(brand) === index
        );

      // Найти названия (бренд + название)
      const names = perfumes
        .filter((perfume) =>
          perfume.brand.toLowerCase().startsWith(searchLower) ||
          `${perfume.brand} ${perfume.name}`.toLowerCase().includes(searchLower)
        )
        .map((perfume) => `${perfume.brand} ${perfume.name}`);

      // Объединить результаты и ограничить до 8 элементов
      const searchResults = [...brands, ...names].slice(0, 8);

      return res.json({ searchResults });
    } catch (parseErr) {
      console.error("Error parsing JSON", parseErr);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
