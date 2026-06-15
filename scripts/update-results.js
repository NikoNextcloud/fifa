/**
 * update-results.js
 * ------------------
 * Тегли резултатите от World Cup 2026 от безплатно API:
 * https://worldcup26.ir/get/games
 * БЕЗ нужда от API ключ!
 *
 * Записва data/results.json и results.json.
 */

const fs = require("fs");
const path = require("path");

// ---- групи и мачове от app.js ----
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

const ourMatches = Object.entries(groups).flatMap(([group, teams]) =>
  pairings.map(([h, a], idx) => ({
    id: `${group}-${idx + 1}`,
    home: teams[h],
    away: teams[a]
  }))
);

// Алтернативни имена (API може да ползва различни варианти)
const nameAliases = {
  "Czechia":                  ["Czech Republic", "Czechia"],
  "United States":            ["USA", "United States", "United States of America"],
  "Ivory Coast":              ["Côte d'Ivoire", "Cote d'Ivoire", "Ivory Coast"],
  "South Korea":              ["Korea Republic", "Korea, Republic of", "South Korea"],
  "Bosnia and Herzegovina":   ["Bosnia & Herzegovina", "Bosnia and Herzegovina", "Bosnia"],
  "Cape Verde":               ["Cabo Verde", "Cape Verde"],
  "DR Congo":                 ["Congo DR", "DR Congo", "Democratic Republic of Congo"],
  "Turkey":                   ["Türkiye", "Turkey"],
  "Curacao":                  ["Curaçao", "Curacao"],
};

function normalize(n) { return n.toLowerCase().trim(); }

function namesMatch(our, api) {
  if (normalize(our) === normalize(api)) return true;
  const aliases = nameAliases[our] || [];
  return aliases.some(a => normalize(a) === normalize(api));
}

async function fetchGames() {
  const url = "https://worldcup26.ir/get/games";
  console.log(`Теглям от ${url} ...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
  // API връща масив директно или обект с поле games/matches
  if (Array.isArray(data)) return data;
  if (data.games)   return data.games;
  if (data.matches) return data.matches;
  throw new Error("Неочакван формат от API: " + JSON.stringify(data).slice(0, 200));
}

function buildResults(games) {
  const matches = {};

  for (const ourMatch of ourMatches) {
    const game = games.find(g => {
      // Пробваме различни полета за имена на отборите
      const home = g.home_team?.name || g.homeTeam?.name || g.home?.name || g.home || "";
      const away = g.away_team?.name || g.awayTeam?.name || g.away?.name || g.away || "";
      return namesMatch(ourMatch.home, home) && namesMatch(ourMatch.away, away);
    });

    if (!game) continue;

    // Вземаме резултата — API може да ползва различни полета
    const homeScore = game.home_score ?? game.homeScore ?? game.home_team?.goals ?? game.score?.home ?? null;
    const awayScore = game.away_score ?? game.awayScore ?? game.away_team?.goals ?? game.score?.away ?? null;

    // Статус — завършен или в ход
    const status = game.status || game.matchStatus || "";
    const playedStatuses = ["completed", "finished", "ft", "aet", "pen", "1h", "2h", "ht", "live", "in_play", "inplay"];
    const isPlayed = playedStatuses.some(s => status.toLowerCase().includes(s));

    if (isPlayed && homeScore !== null && awayScore !== null) {
      matches[ourMatch.id] = { home: Number(homeScore), away: Number(awayScore) };
    }
  }

  return {
    updatedAt: new Date().toISOString(),
    matches
  };
}

async function main() {
  const games = await fetchGames();
  console.log(`Получени ${games.length} мача от API.`);

  const result = buildResults(games);
  const matchCount = Object.keys(result.matches).length;
  console.log(`Намерени резултати за ${matchCount} от нашите мачове.`);

  const json = JSON.stringify(result, null, 2);
  const root = path.join(__dirname, "..");
  fs.writeFileSync(path.join(root, "results.json"), json, "utf-8");
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.writeFileSync(path.join(root, "data", "results.json"), json, "utf-8");

  console.log("✓ Записани: results.json и data/results.json");
  console.log("Последно обновяване:", result.updatedAt);
}

main().catch(err => {
  console.error("Грешка:", err.message);
  process.exit(1);
});
