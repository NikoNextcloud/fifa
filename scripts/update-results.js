/**
 * update-results.js
 * -------------------
 * Тегли резултатите от мачовете на World Cup 2026 от api-football.com
 * и записва файл data/results.json (и results.json) във формат, който
 * приложението очаква:
 *
 * {
 *   "updatedAt": "ISO дата",
 *   "matches": {
 *     "A-1": { "home": 2, "away": 0 },
 *     ...
 *   }
 * }
 *
 * Стартиране:
 *   node update-results.js
 *
 * Изисква файл .env (копирай от .env.example) със следните променливи:
 *   API_FOOTBALL_KEY=...
 *   SEASON=2026
 *   LEAGUE_ID=1
 */

const fs = require("fs");
const path = require("path");

// ---- зареждане на .env (без външни библиотеки) ----
function loadEnv(file) {
  const envPath = path.join(__dirname, file);
  if (!fs.existsSync(envPath)) return {};
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

const env = { ...loadEnv(".env"), ...process.env };

const API_KEY = env.API_FOOTBALL_KEY;
const SEASON = env.SEASON || "2026";
const LEAGUE_ID = env.LEAGUE_ID || "1";

if (!API_KEY || API_KEY === "твоят_ключ_тук") {
  console.error("ГРЕШКА: Липсва API ключ. Копирай scripts/.env.example като scripts/.env и сложи своя ключ от api-football.com.");
  process.exit(1);
}

// ---- групи и отбори, същите като в app.js ----
const groups = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["United States", "Paraguay", "Australia", "Turkey"],
  E: ["Germany", "Curacao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"]
};

const pairings = [ [0, 1], [2, 3], [0, 2], [3, 1], [3, 0], [1, 2] ];

// Изграждаме нашите собствени мачове с ID-та A-1...L-6, същата логика като в app.js
const ourMatches = Object.entries(groups).flatMap(([group, teams]) =>
  pairings.map(([homeIdx, awayIdx], idx) => ({
    id: `${group}-${idx + 1}`,
    home: teams[homeIdx],
    away: teams[awayIdx]
  }))
);

// Алтернативни/английски имена, ако api-football връща различни наименования
const nameAliases = {
  "Czechia": ["Czech Republic"],
  "United States": ["USA"],
  "Ivory Coast": ["Côte d'Ivoire", "Cote d'Ivoire"],
  "South Korea": ["Korea Republic"],
  "Bosnia and Herzegovina": ["Bosnia & Herzegovina", "Bosnia and Herzegovina", "Bosnia"],
  "Cape Verde": ["Cabo Verde"],
  "DR Congo": ["Congo DR", "DR Congo"],
};

function normalize(name) {
  return name.toLowerCase().trim();
}

function namesMatch(ourName, apiName) {
  if (normalize(ourName) === normalize(apiName)) return true;
  const aliases = nameAliases[ourName] || [];
  return aliases.some((a) => normalize(a) === normalize(apiName));
}

// ---- API заявка ----
async function fetchFixtures() {
  const url = `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`;
  const res = await fetch(url, {
    headers: {
      "x-apisports-key": API_KEY
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error("API грешка: " + JSON.stringify(data.errors));
  }

  return data.response || [];
}

function buildResultsJson(fixtures) {
  const matches = {};

  for (const ourMatch of ourMatches) {
    const fixture = fixtures.find((f) => {
      const homeName = f.teams?.home?.name || "";
      const awayName = f.teams?.away?.name || "";
      return (
        namesMatch(ourMatch.home, homeName) &&
        namesMatch(ourMatch.away, awayName)
      );
    });

    if (!fixture) continue;

    const homeGoals = fixture.goals?.home;
    const awayGoals = fixture.goals?.away;
    const status = fixture.fixture?.status?.short; // напр. FT, 1H, NS, PST, CANC

    // Записваме резултат само ако мачът е започнал/приключил и има стойности.
    // Статуси като NS (не е започнал), PST (отложен), CANC (отменен) се пропускат.
    const playedStatuses = ["FT", "AET", "PEN", "1H", "2H", "HT", "ET", "BT", "P"];
    if (playedStatuses.includes(status) && homeGoals !== null && awayGoals !== null) {
      matches[ourMatch.id] = { home: homeGoals, away: awayGoals };
    }
  }

  return {
    updatedAt: new Date().toISOString(),
    matches
  };
}

async function main() {
  console.log("Тегля фикстури от api-football.com...");
  const fixtures = await fetchFixtures();
  console.log(`Получени ${fixtures.length} мача от API.`);

  const result = buildResultsJson(fixtures);
  const matchCount = Object.keys(result.matches).length;
  console.log(`Намерени резултати за ${matchCount} от нашите мачове.`);

  const json = JSON.stringify(result, null, 2);

  const root = path.join(__dirname, "..");
  fs.writeFileSync(path.join(root, "results.json"), json, "utf-8");
  fs.writeFileSync(path.join(root, "data", "results.json"), json, "utf-8");

  console.log("Записани: results.json и data/results.json");
}

main().catch((err) => {
  console.error("Неуспешно обновяване:", err.message);
  process.exit(1);
});
