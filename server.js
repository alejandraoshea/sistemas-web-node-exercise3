const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const dictionary = [
  "sun", "moon", "star", "stars", "starlight", "night", "dawn", "twilight",
  "sunrise", "sunset", "sky", "cloud", "storm", "rain", "wind", "snow",
  "frost", "ice", "fire", "ember", "flame", "river", "ocean", "sea", "wave",
  "mountain", "forest", "tree", "leaf", "flower", "stone", "crystal", "mist",
  "shadow", "light", "spark", "echo", "whisper", "dream", "silence",
  "magic", "sword", "shield", "rune", "arcane", "mystic", "spell", 
  "guardian", "wanderer", "legend", "myth", "oracle", "prophecy", "moonlight",
  "nightfall", "stardust", "dreamer", "seeker", "voyager", "sage", "keeper",
  "watcher", "hunter", "ghost", "shadowfall",
  "hope", "grace", "truth", "peace", "honor", "valor", "fate", "destiny",
  "freedom", "eternity", "harmony", "memory", "song", "serenity", "wisdom",
  "kindness", "radiance", "infinity", "courage",
  "silver", "golden", "crimson", "azure", "emerald", "onyx", "sapphire",
  "amber", "scarlet", "midnight", "celestial", "ethereal", "lunar", "solar",
  "galaxy", "cosmos", "nebula", "nova", "comet", "eclipse"
];

function generatePassword(numWords) {
  const words = [];
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    words.push(dictionary[randomIndex]);
  }
  return words.join("-");
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/style.css") {
    const cssPath = path.join(__dirname, "style.css");
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("CSS file not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
    return;
  }

  const x = Math.max(1, parseInt(parsedUrl.query.x) || 4);
  const password = generatePassword(x);

  fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, html) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading HTML file");
      return;
    }

    const renderedHtml = html
      .replace("{{password}}", password)
      .replace("{{x}}", x);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(renderedHtml);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
