const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// static fayllar (CSS, images)
app.use(express.static(path.join(__dirname, "public")));

// asosiy HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
