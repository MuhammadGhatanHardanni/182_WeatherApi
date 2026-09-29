const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/lokasi", async (req, res) => {
  const kota = req.query.kota;

  if (!kota) {
    return res.status(400).json({ message: "Parameter kota diperlukan" });
  }

  const apiKey = "0VPXNNjELzAjWtGESRKg"; // Key disembunyikan di sini

  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(kota)}.json?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Gagal mengambil data dari MapTiler",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
