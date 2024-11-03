const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()
const port = 3500

const filePath = path.join(__dirname, 'perfumes.json')

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

// Поиск по запросу
app.get('/api/fragrances', (req, res) => {
  const { brand, name, gender, search } = req.query

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' })
    }

    let parsedData
    try {
      parsedData = JSON.parse(data)
    } catch (jsonErr) {
      return res.status(500).json({ error: 'Failed to parse data file' })
    }

    const filteredParfums = parsedData.perfumes.filter((item) => {
      const fullName = `${item.brand} ${item.name}`.toLowerCase()

      const matchesSearch =
        !search ||
        search
          .toLowerCase()
          .split(' ')
          .every((searchWord) => fullName.split(' ').some((word) => word.startsWith(searchWord)))

      const matchesFilters =
        (!brand || item.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!gender || item.gender.toLowerCase() === gender.toLowerCase())

      return matchesSearch && matchesFilters
    })

    res.json({ perfumes: filteredParfums })
  })
})

// Поиск парфюмов по ID
app.get('/api/fragrances/:id', (req, res) => {
  const { id } = req.params

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data file' })
    }

    let parsedData
    try {
      parsedData = JSON.parse(data)
    } catch (jsonErr) {
      return res.status(500).json({ error: 'Failed to parse data file' })
    }

    // Находим парфюм по ID
    const perfume = parsedData.perfumes.find((item) => item.id === parseInt(id, 10))

    if (!perfume) {
      return res.status(404).json({ error: 'Perfume not found' })
    }

    res.json({ perfume })
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
