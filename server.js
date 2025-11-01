const http = require("http");
const url = require("url");

const dictionary = [
  "sun", "moon", "star", "stars", "starlight", "night", "dawn", "twilight",
  "sunrise", "sunset", "sky", "cloud", "storm", "rain", "wind", "snow",
  "frost", "ice", "fire", "ember", "flame", "river", "ocean", "sea", "wave",
  "mountain", "forest", "tree", "leaf", "flower", "stone", "crystal", "mist",
  "shadow", "light", "spark", "echo", "whisper", "dream", "silence",
  "rune", "arcane", "mystic", "spell", "guardian", "wanderer", "hero",
  "legend", "myth", "oracle", "prophecy", "kingdom", "realm", "moonlight",
  "nightfall", "stardust", "dreamer", "seeker", "voyager",
  "sage", "keeper", "watcher", "hunter", "ghost", "shadowfall",
  "hope", "grace", "truth", "peace", "honor", "fate", "destiny",
  "freedom", "eternity", "harmony", "memory", "silence", "song", "serenity",
  "wisdom", "lightheart", "kindness", "radiance", "infinity", "silver", 
  "golden", "crimson", "azure", "emerald", "onyx", "sapphire",
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
  const queryObject = url.parse(req.url, true).query;
  const x = Math.max(1, parseInt(queryObject.x) || 4); 

  const password = generatePassword(x);

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <h1>🔑 Your Random Password</h1>
    <p style="font-size: 1.5em; color: #444;">
      <strong>${password}</strong>
    </p>
    <p>Generated from ${x} random words 🌙</p>
  `);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
