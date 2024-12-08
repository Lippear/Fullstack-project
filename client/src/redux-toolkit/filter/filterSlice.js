import { createSlice } from '@reduxjs/toolkit'

fetch('http://localhost:3500/api/filter').then((response) => {
  if (!response.ok) {
    throw new Error('Search error')
  } else {
    return response.json()
  }
})
