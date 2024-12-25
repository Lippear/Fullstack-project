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
  const { brands, genders, search, page = 1 } = req.query;
  const itemsPerPage = 6;

  console.log("Получен запрос:", req.query);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла данных:", err);
      return res
        .status(500)
        .json({ error: "Не удалось прочитать файл данных" });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (jsonErr) {
      console.error("Ошибка при парсинге данных:", jsonErr);
      return res
        .status(500)
        .json({ error: "Не удалось распарсить файл данных" });
    }

    let filteredFragrances = parsedData.perfumes.filter((item) => {
      const decodedBrands = brands ? decodeURIComponent(brands) : null;
      const brandList = decodedBrands
        ? decodedBrands.split("+").map((b) => b.trim().toLowerCase())
        : null;

      const matchesBrands =
        !brandList ||
        brandList.some(
          (brand) => item.brand.toLowerCase() === brand // Exact match comparison
        );

      console.log(`Совпадение с брендом ${item.brand}:`, matchesBrands);

      const genderList = genders
        ? genders.split("+").map((g) => g.trim().toLowerCase())
        : null;
      const matchesGenders =
        !genderList || genderList.includes(item.gender.toLowerCase());

      const fullName = `${item.brand} ${item.name}`.toLowerCase();
      const matchesSearch =
        !search ||
        search
          .toLowerCase()
          .split(" ")
          .every((searchWord) =>
            fullName.split(" ").some((word) => word.startsWith(searchWord))
          );

      return matchesBrands && matchesGenders && matchesSearch;
    });

    console.log("Отфильтрованные ароматы:", filteredFragrances);

    // Пагинация
    const totalItems = filteredFragrances.length;
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    const pageNumber = Math.max(1, parseInt(page, 10));
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const fragrances = filteredFragrances.slice(startIndex, endIndex);

    console.log("Возвращаемые ароматы:", fragrances);
    console.log("Общее количество страниц:", pagesCount);

    res.json({
      fragrances,
      totalItems,
      totalPages: pagesCount,
      currentPage: pageNumber,
    });
  });
});

app.get("/api/searchQuery", (req, res) => {
  const { search } = req.query;

  console.log("Search query received:", search);

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

      console.log("Searching for:", searchLower);

      // Найти бренды, соответствующие запросу
      const brands = perfumes
        .map((perfume) => perfume.brand)
        .filter(
          (brand, index, self) =>
            brand.toLowerCase().includes(searchLower) &&
            self.indexOf(brand) === index
        );

      console.log("Brands found:", brands);

      // Найти названия ароматов, соответствующие запросу
      const names = perfumes
        .filter((perfume) =>
          `${perfume.brand} ${perfume.name}`.toLowerCase().includes(searchLower)
        )
        .map((perfume) => `${perfume.brand} ${perfume.name}`);

      console.log("Names found:", names);

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
