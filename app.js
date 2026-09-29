document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const locationInput = document.getElementById("locationInput");

  const loadingIndicator = document.getElementById("loadingIndicator");
  const errorMessage = document.getElementById("errorMessage");
  const resultBox = document.getElementById("resultBox");

  // Result elements
  const resNegara = document.getElementById("resNegara");
  const resProvinsi = document.getElementById("resProvinsi");
  const resKecamatan = document.getElementById("resKecamatan");
  const resLongitude = document.getElementById("resLongitude");
  const resLatitude = document.getElementById("resLatitude");

  // Handle Enter key press
  locationInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  searchBtn.addEventListener("click", performSearch);

  async function performSearch() {
    const location = locationInput.value.trim();

    // Validation
    if (!location) {
      showError("Please enter a location to search.");
      return;
    }

    // Hide previous results and errors
    resultBox.style.display = "none";
    errorMessage.style.display = "none";
    loadingIndicator.style.display = "block";

    try {
      // Mengambil data langsung ke MapTiler agar berfungsi di GitHub Pages
      const apiKey = "0VPXNNjELzAjWtGESRKg";
      const endpoint = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data from API");
      }

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        displayData(feature);
      } else {
        showError("Location not found. Please try another query.");
      }
    } catch (error) {
      showError(`Error: ${error.message}`);
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  function displayData(feature) {
    // Default values
    let negara = "-";
    let provinsi = "-";
    let kecamatan = "-";

    // Extract coordinates
    const [longitude, latitude] = feature.geometry.coordinates;

    // The feature itself might be one of the administrative levels
    const currentId = feature.id || "";
    const currentText = feature.text || "";

    if (currentId.startsWith("country")) negara = currentText;
    if (currentId.startsWith("region")) provinsi = currentText;
    if (
      currentId.startsWith("subregion") ||
      currentId.startsWith("county") ||
      currentId.startsWith("municipality")
    )
      kecamatan = currentText;

    // Parse context for hierarchical administrative levels
    if (feature.context) {
      feature.context.forEach((ctx) => {
        const id = ctx.id;
        if (id.startsWith("country")) {
          negara = ctx.text;
        } else if (id.startsWith("region")) {
          provinsi = ctx.text;
        } else if (
          id.startsWith("subregion") ||
          id.startsWith("county") ||
          id.startsWith("municipality")
        ) {
          kecamatan = ctx.text;
        }
      });
    }

    // Update UI
    resNegara.textContent = negara;
    resProvinsi.textContent = provinsi;
    resKecamatan.textContent = kecamatan;
    resLongitude.textContent = parseFloat(longitude).toFixed(5);
    resLatitude.textContent = parseFloat(latitude).toFixed(5);

    // Show result box
    resultBox.style.display = "block";
  }

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = "block";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const locationInput = document.getElementById("locationInput");

  const loadingIndicator = document.getElementById("loadingIndicator");
  const errorMessage = document.getElementById("errorMessage");
  const resultBox = document.getElementById("resultBox");

  // Handle Enter key press
  locationInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  searchBtn.addEventListener("click", performSearch);

  async function performSearch() {
    const location = locationInput.value.trim();

    // Validation
    if (!location) {
      showError("Please enter a location to search.");
      return;
    }

    // Hide previous results and errors
    resultBox.style.display = "none";
    errorMessage.style.display = "none";
    loadingIndicator.style.display = "block";

    // (Logika API MapTiler akan ditambahkan di commit berikutnya)
  }

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = "block";
    loadingIndicator.style.display = "none";
  }
});