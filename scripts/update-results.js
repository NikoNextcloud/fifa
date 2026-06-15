/**
 * update-results.js
 * ------------------
 * Тегли резултатите от World Cup 2026 от:
 * https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json
 *
 * Напълно БЕЗПЛАТНО, без API ключ, работи от GitHub Actions.
 */

const fs   = require("fs");
const path = require("path");

const SOURCE_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

// ---- Структурата на мачовете от app.js ----
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

const pairings = [ [0,1],[2,3],[0,2],[3,1],[3,0],[1,2] ];

const ourMatches = Object.entries(groups).flatMap(([group, teams]) =>
  pairings.map(([h,a], idx) => ({
    id:   `${group}-${idx+1}`,
    home: teams[h],
    away: teams[a]
  }))
);

// Алтернативни имена (openfootball може да ползва различни варианти)
const aliases = {
  "Czechia":                ["Czech Republic"],
  "United States":          ["USA", "United States"],
  "Ivory Coast":            ["Côte d'Ivoire", "Cote d'Ivoire"],
  "South Korea":            ["Korea Republic", "Korea DPR"],
  "Bosnia and Herzegovina": ["Bosnia & Herzegovina", "Bosnia and Herzegovina"],
  "Cape Verde":             ["Cabo Verde"],
  "DR Congo":               ["Congo DR"],
  "Turkey":                 ["Türkiye"],
  "Curacao":                ["Curaçao"],
};

function norm(s) { return (s || "").toLowerCase().trim(); }

function match(ourName, apiName) {
  if (norm(ourName) === norm(apiName)) return true;
  return (aliases[ourName] || []).some(a => norm(a) === norm(apiName));
}

async function main() {
  console.log("Теглям данни от openfootball World Cup 2026...");
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  const apiMatches = data.matches || [];
  console.log(`Получени ${apiMatches.length} мача.`);

  const results = {};
  let found = 0;

  for (const our of ourMatches) {
    const api = apiMatches.find(m => {
      const t1 = m.team1?.name || m.team1 || "";
      const t2 = m.team2?.name || m.team2 || "";
      return match(our.home, t1) && match(our.away, t2);
    });

    if (!api) continue;

    // openfootball записва резултати в score1 / score2
    const s1 = api.score1 ?? api.ft?.[0] ?? null;
    const s2 = api.score2 ?? api.ft?.[1] ?? null;

    if (s1 !== null && s2 !== null) {
      results[our.id] = { home: Number(s1), away: Number(s2) };
      found++;
    }
  }

  console.log(`Записани резултати: ${found} мача.`);

  const output = JSON.stringify({ updatedAt: new Date().toISOString(), matches: results }, null, 2);
  const root   = path.join(__dirname, "..");

  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.writeFileSync(path.join(root, "results.json"),         output, "utf-8");
  fs.writeFileSync(path.join(root, "data", "results.json"), output, "utf-8");

  console.log("✓ results.json и data/results.json обновени:", new Date().toISOString());
}

main().catch(err => { console.error("Грешка:", err.message); process.exit(1); });
