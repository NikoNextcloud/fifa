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
  "Bosnia and Herzegovina": ["Bosnia-Herzegovina", "Bosnia & Herzegovina", "Bosnia and Herzegovi"],
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

function canonicalTeamName(espnName) {
  return Object.values(groups).flat().find((team) => namesMatch(team, espnName)) || null;
}

function buildOfficialGroupMatches(events) {
  return Object.keys(groups).flatMap((group) =>
    events
      .filter((event) => event?.competitions?.[0]?.altGameNote === `FIFA World Cup, Group ${group}`)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((event, index) => {
        const competitors = event.competitions?.[0]?.competitors || [];
        const homeName = competitors.find((team) => team.homeAway === "home")?.team?.displayName;
        const awayName = competitors.find((team) => team.homeAway === "away")?.team?.displayName;
        return {
          id: `${group}-${index + 1}`,
          home: canonicalTeamName(homeName),
          away: canonicalTeamName(awayName)
        };
      })
      .filter((match) => match.home && match.away)
  );
}

/* ====================== ЕЛИМИНАЦИОННА ФАЗА — копие на логиката от app.js ====================== */

function isPlayed(score) {
  return score && score.home !== undefined && score.away !== undefined && score.home !== null && score.away !== null && score.home !== "" && score.away !== "";
}

function calculateTable(group, scores) {
  const rows = groups[group].map((team) => ({
    team, played: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
  }));
  const byTeam = Object.fromEntries(rows.map((row) => [row.team, row]));

  ourMatches
    .filter((m) => m.id.startsWith(`${group}-`))
    .forEach((m) => {
      const score = scores[m.id];
      if (!isPlayed(score)) return;
      const home = byTeam[m.home];
      const away = byTeam[m.away];
      const hg = Number(score.home);
      const ag = Number(score.away);
      home.played += 1; away.played += 1;
      home.goalsFor += hg; home.goalsAgainst += ag;
      away.goalsFor += ag; away.goalsAgainst += hg;
      if (hg > ag) home.points += 3;
      else if (ag > hg) away.points += 3;
      else { home.points += 1; away.points += 1; }
    });

  rows.forEach((r) => { r.goalDifference = r.goalsFor - r.goalsAgainst; });
  return rows.sort((a, b) =>
    b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor || a.team.localeCompare(b.team)
  );
}

function groupIsComplete(group, scores) {
  return ourMatches.filter((m) => m.id.startsWith(`${group}-`)).every((m) => isPlayed(scores[m.id]));
}

function rankThirdPlaceTeams(scores) {
  const thirds = Object.keys(groups).map((group) => ({ group, ...calculateTable(group, scores)[2] }));
  return thirds.sort((a, b) =>
    b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor || a.group.localeCompare(b.group)
  );
}

// Трябва да съвпада точно със bracketSeeds в app.js
const bracketSeeds = [
  { home: { type: "winner", group: "A" },   away: { type: "third", slot: 0 } },
  { home: { type: "winner", group: "B" },   away: { type: "third", slot: 1 } },
  { home: { type: "winner", group: "E" },   away: { type: "runnerup", group: "I" } },
  { home: { type: "winner", group: "F" },   away: { type: "runnerup", group: "E" } },
  { home: { type: "winner", group: "C" },   away: { type: "third", slot: 2 } },
  { home: { type: "winner", group: "I" },   away: { type: "third", slot: 3 } },
  { home: { type: "winner", group: "D" },   away: { type: "runnerup", group: "C" } },
  { home: { type: "runnerup", group: "A" }, away: { type: "runnerup", group: "B" } },
  { home: { type: "winner", group: "L" },   away: { type: "third", slot: 4 } },
  { home: { type: "winner", group: "K" },   away: { type: "third", slot: 5 } },
  { home: { type: "winner", group: "H" },   away: { type: "runnerup", group: "J" } },
  { home: { type: "winner", group: "J" },   away: { type: "third", slot: 6 } },
  { home: { type: "winner", group: "G" },   away: { type: "third", slot: 7 } },
  { home: { type: "runnerup", group: "F" }, away: { type: "runnerup", group: "G" } },
  { home: { type: "runnerup", group: "H" }, away: { type: "runnerup", group: "K" } },
  { home: { type: "runnerup", group: "D" }, away: { type: "runnerup", group: "L" } }
];

function getQualifiers(scores) {
  const winner = {}, runnerup = {};
  Object.keys(groups).forEach((group) => {
    if (groupIsComplete(group, scores)) {
      const table = calculateTable(group, scores);
      winner[group] = table[0].team;
      runnerup[group] = table[1].team;
    }
  });
  const allDone = Object.keys(groups).every((g) => groupIsComplete(g, scores));
  const third = allDone ? rankThirdPlaceTeams(scores).slice(0, 8).map((r) => r.team) : [];
  return { winner, runnerup, third, allDone };
}

function resolveSlot(slot, q) {
  if (slot.type === "winner") return q.winner[slot.group] || null;
  if (slot.type === "runnerup") return q.runnerup[slot.group] || null;
  if (slot.type === "third") return q.third[slot.slot] || null;
  return null;
}

function matchWinner(home, away, score) {
  if (!isPlayed(score)) return null;
  const h = Number(score.home), a = Number(score.away);
  if (h === a) return score.penaltyWinner === "away" ? away : home;
  return h > a ? home : away;
}

// Изгражда списък от { id, home, away } за всички кръгове на елиминационната фаза,
// използвайки вече известни knockout резултати, за да придвижи победителите напред.
function buildKnockoutMatches(groupScores, knockoutScores) {
  const q = getQualifiers(groupScores);
  if (!q.allDone) return [];

  const round32 = bracketSeeds.map((seed, i) => ({
    id: `R32-${i + 1}`,
    home: resolveSlot(seed.home, q),
    away: resolveSlot(seed.away, q)
  }));

  function nextRound(prev, prefix) {
    const out = [];
    for (let i = 0; i < prev.length; i += 2) {
      const a = prev[i], b = prev[i + 1];
      out.push({
        id: `${prefix}-${out.length + 1}`,
        home: matchWinner(a.home, a.away, knockoutScores[a.id]),
        away: matchWinner(b.home, b.away, knockoutScores[b.id])
      });
    }
    return out;
  }

  const round16 = nextRound(round32, "R16");
  const quarter = nextRound(round16, "QF");
  const semi = nextRound(quarter, "SF");
  const final = nextRound(semi, "F");

  let all = [...round32, ...round16, ...quarter, ...semi, ...final];

  if (semi.length === 2) {
    const loserA = isPlayed(knockoutScores["SF-1"])
      ? (matchWinner(semi[0].home, semi[0].away, knockoutScores["SF-1"]) === semi[0].home ? semi[0].away : semi[0].home)
      : null;
    const loserB = isPlayed(knockoutScores["SF-2"])
      ? (matchWinner(semi[1].home, semi[1].away, knockoutScores["SF-2"]) === semi[1].home ? semi[1].away : semi[1].home)
      : null;
    all.push({ id: "3RD", home: loserA, away: loserB });
  }

  // Само мачовете, на които вече знаем и двата отбора, си струва да теглим от ESPN
  return all.filter((m) => m.home && m.away);
}

async function fetchEspnEvents() {
  const res = await fetch(ESPN_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.events || [];
}

function findEventResult(events, homeTeam, awayTeam) {
  const event = events.find((e) => {
    const comps = e.competitions?.[0]?.competitors || [];
    if (comps.length < 2) return false;
    const home = comps.find((c) => c.homeAway === "home")?.team?.displayName || "";
    const away = comps.find((c) => c.homeAway === "away")?.team?.displayName || "";
    // Knockout мачовете може да са обърнати спрямо нашия home/away (домакин по жребий, не по терен)
    return (namesMatch(homeTeam, home) && namesMatch(awayTeam, away)) ||
           (namesMatch(homeTeam, away) && namesMatch(awayTeam, home));
  });
  if (!event) return null;

  const comp = event.competitions?.[0];
  const status = comp?.status?.type;
  const isActive = status?.state === "post" || status?.state === "in";
  if (!isActive) return null;

  const comps = comp.competitors || [];
  const homeComp = comps.find((c) => c.homeAway === "home");
  const awayComp = comps.find((c) => c.homeAway === "away");
  const espnHomeName = homeComp?.team?.displayName || "";

  const homeScore = parseInt(homeComp?.score ?? "-1");
  const awayScore = parseInt(awayComp?.score ?? "-1");
  if (homeScore < 0 || awayScore < 0) return null;

  // Подравняваме резултата спрямо нашия ред (home/away), не спрямо ESPN реда
  const ourHomeIsEspnHome = namesMatch(homeTeam, espnHomeName);
  const result = ourHomeIsEspnHome
    ? { home: homeScore, away: awayScore }
    : { home: awayScore, away: homeScore };

  // Дузпи, ако има такива и резултатът е равен след продължения
  const homeShootout = homeComp?.shootoutScore;
  const awayShootout = awayComp?.shootoutScore;
  if (homeScore === awayScore && (homeShootout || awayShootout)) {
    const homeWonShootout = Number(homeShootout) > Number(awayShootout);
    result.penaltyWinner = ourHomeIsEspnHome
      ? (homeWonShootout ? "home" : "away")
      : (homeWonShootout ? "away" : "home");
  }

  return result;
}

async function main() {
  console.log("Теглям от ESPN API...");
  const events = await fetchEspnEvents();
  console.log(`Получени ${events.length} мача от ESPN.`);

  const officialGroupMatches = buildOfficialGroupMatches(events);
  if (officialGroupMatches.length !== 72) {
    throw new Error(`Очаквани 72 групови мача, получени ${officialGroupMatches.length}`);
  }
  ourMatches.splice(0, ourMatches.length, ...officialGroupMatches);

  const results = {};
  for (const our of ourMatches) {
    const r = findEventResult(events, our.home, our.away);
    if (r) results[our.id] = r;
  }
  console.log(`Записани резултати за ${Object.keys(results).length} групови мача.`);

  // Елиминационна фаза: изчисляваме кои двойки вече са известни от груповите резултати,
  // и пробваме да издърпаме резултат само за тях.
  const knockout = {};
  let knockoutMatches = buildKnockoutMatches(results, knockout);
  // Може да се наложат няколко прохода — пресмятаме на вълни,
  // защото следващ кръг зависи от резултата на предишния.
  for (let pass = 0; pass < 6; pass++) {
    knockoutMatches = buildKnockoutMatches(results, knockout);
    let changed = false;
    for (const m of knockoutMatches) {
      if (knockout[m.id]) continue;
      const r = findEventResult(events, m.home, m.away);
      if (r) { knockout[m.id] = r; changed = true; }
    }
    if (!changed) break;
  }
  console.log(`Записани резултати за ${Object.keys(knockout).length} мача от елиминационната фаза.`);

  const matchCount = Object.keys(results).length;

  const output = JSON.stringify({
    updatedAt: new Date().toISOString(),
    matches: results,
    knockout
  }, null, 2);
  const root   = path.join(__dirname, "..");
  fs.mkdirSync(path.join(root, "data"), { recursive: true });
  fs.writeFileSync(path.join(root, "results.json"),         output, "utf-8");
  fs.writeFileSync(path.join(root, "data", "results.json"), output, "utf-8");

  console.log("✓ Записано:", new Date().toISOString());
  if (matchCount > 0) {
    console.log("Групови резултати:", JSON.stringify(results, null, 2));
  }
  if (Object.keys(knockout).length > 0) {
    console.log("Елиминационни резултати:", JSON.stringify(knockout, null, 2));
  }
}

main().catch(err => { console.error("Грешка:", err.message); process.exit(1); });
