# 🍽️ Restaurant Ping API

A lightweight **Node.js + Express API** that serves restaurant/franchise data from a local JSON file and supports filtering, availability checks, and distance-based sorting.

---

## 🎯 Project Goals

This project is designed to be:

- **Simple**
- **Transparent**
- **Fast**
- **Easy to extend**  
  (distance ranking, best-match scoring, authentication, etc.)

---

## 📦 Features

- Load restaurant data from `data.json`
- Health check endpoint
- Fetch all restaurants
- Fetch restaurant by ID
- Filter restaurants by:
  - Open status
  - Town
  - Cuisine
- **Distance-based sorting** using latitude & longitude  
  (Haversine formula)

---
