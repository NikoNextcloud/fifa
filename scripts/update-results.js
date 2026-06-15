/**
 * update-results.js
 * ------------------
 * Тегли резултатите от World Cup 2026 от ESPN публичното API.
 * БЕЗ API ключ, БЕЗ регистрация, работи от GitHub Actions.
 *
 * Endpoint: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard
 */

const fs   = require("fs");
const path = require("path");

const ESPN_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard" +
  "?limit=200&dates=20260611-20260719";

// Структурата на мачовете — трябва да съвпада с app.js
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
  pairings.map(([h, a], idx) => ({
    id:   `${group}-${idx + 1}`,
    home: teams[h],
    away: teams[a]
  }))
);

// ESPN може да ползва различни имена
const aliases = {
  "Czechia":                ["Czech Republic"],
  "United States":          ["USA"],
  "Ivory Coast":            ["Côte d'Ivoire", "Cote d'Ivoire"],
  "South Korea":            ["Korea Republic", "South Korea"],
  "Bosnia and Herzegovina": ["Bosnia & Herzegovina", "Bosnia and Herzegovi"],
  "Cape Verde":             ["Cabo Verde"],
  "DR Congo":               ["Congo DR", "Democratic Republic of Congo"],
  "Turkey":                 ["Türkiye"],
  "Curacao":                ["Curaçao"],
};

function norm(s) { return (s || "").toLowerCase().trim(); }

function namesMatch(ourName, espnName) {
  if (norm(ourName) === norm(espnName)) return true;
  return (aliases[ourName] || []).some(a => norm(a) === norm(espnName));
}

async function main() {
  console.log("Теглям от ESPN API...");
  const res = await fetch(ESPN_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();

  const events = data.events || [];
  console.log(`Получени ${events.length} мача от ESPN.`);

  const results = {};

  for (const our of ourMatches) {
    const event = events.find(e => {
      const comps = e.competitions?.[0]?.competitors || [];
      if (comps.length < 2) return false;
      const home = comps.find(c => c.homeAway === "home")?.team?.displayName || "";
      const away = comps.find(c => c.homeAway === "away")?.team?.displayName || "";
      return namesMatch(our.home, home) && namesMatch(our.away, away);
    });

    if (!event) continue;

    const comp   = event.competitions?.[0];
    const status = comp?.status?.type;

    // Записваме само завършени или текущи мачове
    const isActive = status?.state === "post" || status?.state === "in";
    if (!isActive) continue;

    const comps    = comp.competitors || [];
    const homeComp = comps.find(c => c.homeAway === "home");
    const awayComp = comps.find(c => c.homeAway === "away");

    const homeScore = parseInt(homeComp?.score ?? "-1");
    const awayScore = parseInt(awayComp?.score ?? "-1");

    if (homeScore >= 0 && awayScore >= 0) {
      results[our.id] = { home: homeScore, away: awayScore };
    }
  }

  const matchCount = Object.keys(results).length;
  console.log(`Записани резултати за ${matchCount} мача.`);

  const output = JSON.stringify({ updatedAt: new Date().toISOString(), matches: results }, null, 2);
  const root   = path.join(__dirname, "..");
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.writeFileSync(path.join(root, "results.json"),         output, "utf-8");
  fs.writeFileSync(path.join(root, "data", "results.json"), output, "utf-8");

  console.log("✓ Записано:", new Date().toISOString());
  if (matchCount > 0) {
    console.log("Резултати:", JSON.stringify(results, null, 2));
  }
}

main().catch(err => { console.error("Грешка:", err.message); process.exit(1); });
