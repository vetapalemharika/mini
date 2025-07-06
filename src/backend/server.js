const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const sampleHeadlines = [
  "Discover Why {name} is the Go-To Choice in {location} for 2025!",
  "{name}: Leading the Way in {location}'s Local Scene!",
  "How {name} is Transforming Experiences in {location}",
  "The Secret Behind {name}'s Popularity in {location} Revealed!",
  "Top Reasons to Choose {name} in {location} This Year!"
];

function generateHeadline(name, location) {
  const template = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)];
  return template.replace("{name}", name).replace("{location}", location);
}

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  const data = {
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 20,
    headline: generateHeadline(name, location)
  };

  res.json(data);
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;
  const headline = generateHeadline(name, location);
  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
