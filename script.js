document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generateButton");
  generateButton.addEventListener("click", generateFonts);

  async function fetchFonts() {
    const apiKey = "AIzaSyCHLj88Qof5H6Y3BxOqtbTkv7IbW_U6zt8"; // Replace 'YOUR_API_KEY' with your actual API key
    const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch fonts");
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching fonts:", error);
      return [];
    }
  }

  async function generateFonts() {
    const word = document.getElementById("wordInput").value;
    const fontResults = document.getElementById("fontResults");

    // Clear previous results
    fontResults.innerHTML = "";

    // Fetch fonts from Google Fonts API
    const fonts = await fetchFonts();

    // Add font family links to the head section
    fonts.forEach((font) => {
      //Exclude These Fonts (Buda", "Molle", "UnifrakturCook", "Sunflower) it make issues in the page like cross origin
      const excludedFonts = ["Buda", "Molle", "UnifrakturCook", "Sunflower"];
      if (!excludedFonts.includes(font.family)) {
        const fontLink = document.createElement("link");
        fontLink.rel = "stylesheet";
        fontLink.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(
          / /g,
          "+"
        )}`;
        document.head.appendChild(fontLink);
      } 
    });

    // Display the input word and Font-Family-Name using each selected font
    fonts.forEach((font) => {
      const fontElement = document.createElement("div");
      const fontElementFamily = document.createElement("span");
      fontElementFamily.textContent = `Font Family: ${font.family}`;
      fontElement.style.fontFamily = font.family;
      fontElement.textContent = word;
      fontResults.appendChild(fontElement);
      fontElement.appendChild(fontElementFamily);
    });
  }
});
