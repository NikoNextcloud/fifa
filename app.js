// Дефиниция на групите и отборите
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

const teamCountryCodes = {
  "Mexico": "mx", "South Africa": "za", "South Korea": "kr", "Czechia": "cz",
  "Canada": "ca", "Bosnia and Herzegovina": "ba", "Qatar": "qa", "Switzerland": "ch",
  "Brazil": "br", "Morocco": "ma", "Haiti": "ht", "Scotland": "gb-sct",
  "United States": "us", "Paraguay": "py", "Australia": "au", "Turkey": "tr",
  "Germany": "de", "Curacao": "cw", "Ivory Coast": "ci", "Ecuador": "ec",
  "Netherlands": "nl", "Japan": "jp", "Sweden": "se", "Tunisia": "tn",
  "Belgium": "be", "Egypt": "eg", "Iran": "ir", "New Zealand": "nz",
  "Spain": "es", "Cape Verde": "cv", "Saudi Arabia": "sa", "Uruguay": "uy",
  "France": "fr", "Senegal": "sn", "Iraq": "iq", "Norway": "no",
  "Argentina": "ar", "Algeria": "dz", "Austria": "at", "Jordan": "jo",
  "Portugal": "pt", "DR Congo": "cd", "Uzbekistan": "uz", "Colombia": "co",
  "England": "gb-eng", "Croatia": "hr", "Ghana": "gh", "Panama": "pa"
};

// Генериране на мачовете по класическата схема за 4 отбора
const matchSchedule = [];
Object.keys(groups).forEach(g => {
  const t = groups[g];
  matchSchedule.push({ id: `${g}-1`, group: g, home: t[0], away: t[1], date: "11 Юни" });
  matchSchedule.push({ id: `${g}-2`, group: g, home: t[2], away: t[3], date: "12 Юни" });
  matchSchedule.push({ id: `${g}-3`, group: g, home: t[0], away: t[2], date: "16 Юни" });
  matchSchedule.push({ id: `${g}-4`, group: g, home: t[3], away: t[1], date: "17 Юни" });
  matchSchedule.push({ id: `${g}-5`, group: g, home: t[3], away: t[0], date: "21 Юни" });
  matchSchedule.push({ id: `${g}-6`, group: g, home: t[1], away: t[2], date: "22 Юни" });
});

// Глобално състояние
const state = {
  currentView: "groups",
  groupFilter: "all",
  statusFilter: "all",
  scores: {}, // От API-то
  bets: JSON.parse(localStorage.getItem("fifa2026_bets") || "{}"),
  lastUpdated: null
};

const WC_API_BASE = "https://worldcup26.ir/api/v1";
const refreshEveryMs = 60000;

// Елементи и селектори
const views = {
  groups: document.querySelector("#groupsView"),
  matches: document.querySelector("#matchesView"),
  bracket: document.querySelector("#bracketView"),
  bets: document.querySelector("#betsView")
};

const matchesList = document.querySelector("#matchesList");
const betsList = document.querySelector("#betsList");
const standingsGrid = document.querySelector("#standingsGrid");
const groupFilter = document.querySelector("#groupFilter");
const statusFilter = document.querySelector("#statusFilter");
const syncStatus = document.querySelector("#syncStatus");
const playedCount = document.querySelector("#playedCount");
const goalsCount = document.querySelector("#goalsCount");
const stageLabel = document.querySelector("#stageLabel");
const progressPercent = document.querySelector("#progressPercent");
const progressFill = document.querySelector("#progressFill");

// Навигация между табовете
document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

if (groupFilter) {
  groupFilter.addEventListener("change", () => {
    state.groupFilter = groupFilter.value;
    renderMatches();
  });
}

if (statusFilter) {
  statusFilter.addEventListener("change", () => {
    state.statusFilter = statusFilter.value;
    renderMatches();
  });
}

function setView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll(".tab").forEach(b => {
    b.classList.toggle("active", b.dataset.view === viewName);
  });
  Object.keys(views).forEach(k => {
    if (views[k]) views[k].classList.toggle("active", k === viewName);
  });
}

// Помощни функции за флагове
function getFlagUrl(teamName) {
  const code = teamCountryCodes[teamName] || "un";
  return `https://flagcdn.com/${code}.svg`;
}

function findMatchId(home, away) {
  const match = matchSchedule.find(m => 
    (m.home.toLowerCase() === home.toLowerCase() && m.away.toLowerCase() === away.toLowerCase()) ||
    (m.home.toLowerCase() === away.toLowerCase() && m.away.toLowerCase() === home.toLowerCase())
  );
  return match ? match.id : null;
}

function isPlayed(matchId) {
  return state.scores[matchId] !== undefined;
}

// Изчисления на таблицата за група
function calculateTable(groupLetter) {
  const teamNames = groups[groupLetter];
  const rows = teamNames.map(t => ({
    team: t, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
  }));

  matchSchedule.filter(m => m.group === groupLetter).forEach(m => {
    if (!isPlayed(m.id)) return;
    const res = state.scores[m.id];
    const hRow = rows.find(r => r.team === m.home);
    const aRow = rows.find(r => r.team === m.away);

    if (hRow && aRow) {
      hRow.played++;
      aRow.played++;
      hRow.goalsFor += res.home;
      hRow.goalsAgainst += res.away;
      aRow.goalsFor += res.away;
      aRow.goalsAgainst += res.home;

      if (res.home > res.away) {
        hRow.won++; hRow.points += 3; aRow.lost++;
      } else if (res.home < res.away) {
        aRow.won++; aRow.points += 3; hRow.lost++;
      } else {
        hRow.drawn++; hRow.points += 1; aRow.drawn++; aRow.points += 1;
      }
    }
  });

  rows.forEach(r => {
    r.goalDifference = r.goalsFor - r.goalsAgainst;
  });

  return rows.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.localeCompare(b.team);
  });
}

// Рендериране на всичко
function renderAll() {
  renderStats();
  renderGroups();
  renderMatches();
  renderBets();
}

function renderStats() {
  let totalPlayed = 0;
  let totalGoals = 0;
  
  matchSchedule.forEach(m => {
    if (isPlayed(m.id)) {
      totalPlayed++;
      totalGoals += (state.scores[m.id].home + state.scores[m.id].away);
    }
  });

  if (playedCount) playedCount.textContent = `${totalPlayed}/${matchSchedule.length}`;
  if (goalsCount) goalsCount.textContent = totalGoals;
  
  const pct = matchSchedule.length > 0 ? Math.round((totalPlayed / matchSchedule.length) * 100) : 0;
  if (progressPercent) progressPercent.textContent = `${pct}% завършени`;
  if (progressFill) progressFill.style.width = `${pct}%`;
}

function renderGroups() {
  if (!standingsGrid) return;
  standingsGrid.innerHTML = "";

  Object.keys(groups).forEach(g => {
    const tableData = calculateTable(g);
    const card = document.createElement("div");
    card.className = "table-card";
    
    let rowsHtml = "";
    tableData.forEach((row, idx) => {
      rowsHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td class="team-cell"><img class="flag" src="${getFlagUrl(row.team)}" alt=""> ${row.team}</td>
          <td>${row.played}</td>
          <td><strong>${row.points}</strong></td>
          <td>${row.goalDifference}</td>
        </tr>
      `;
    });

    card.innerHTML = `
      <h2>Група ${g}</h2>
      <table class="modern-table">
        <thead>
          <tr>
            <th style="width:20px;">#</th>
            <th>Отбор</th>
            <th style="width:25px;">М</th>
            <th style="width:25px;">Т</th>
            <th style="width:30px;">ГД</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
    standingsGrid.append(card);
  });
}

function renderMatches() {
  if (!matchesList) return;
  matchesList.innerHTML = "";

  const filtered = matchSchedule.filter(m => {
    if (state.groupFilter !== "all" && m.group !== state.groupFilter) return false;
    if (state.statusFilter === "played" && !isPlayed(m.id)) return false;
    if (state.statusFilter === "upcoming" && isPlayed(m.id)) return false;
    return true;
  });

  if (filtered.length === 0) {
    matchesList.innerHTML = "<p style='color:var(--muted); padding:20px;'>Няма мачове, отговарящи на филтрите.</p>";
    return;
  }

  filtered.forEach(m => {
    const played = isPlayed(m.id);
    const res = played ? state.scores[m.id] : { home: "", away: "" };
    
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="match-meta">
        <span>Група ${m.group}</span>
        <span>${m.date}</span>
      </div>
      <div class="match-main">
        <div class="match-row">
          <div class="match-team">
            <img class="flag" src="${getFlagUrl(m.home)}" alt="">
            <span>${m.home}</span>
          </div>
          <input type="text" class="score-input" value="${res.home}" disabled>
        </div>
        <div class="match-row">
          <div class="match-team">
            <img class="flag" src="${getFlagUrl(m.away)}" alt="">
            <span>${m.away}</span>
          </div>
          <input type="text" class="score-input" value="${res.away}" disabled>
        </div>
      </div>
    `;
    matchesList.append(card);
  });
}

function renderBets() {
  if (!betsList) return;
  betsList.innerHTML = "";

  matchSchedule.forEach(m => {
    const userBet = state.bets[m.id] || { home: "", away: "" };
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="match-meta">
        <span>Група ${m.group} - Прогноза</span>
        <span>${m.date}</span>
      </div>
      <div class="match-main">
        <div class="match-row">
          <div class="match-team">
            <img class="flag" src="${getFlagUrl(m.home)}" alt="">
            <span>${m.home}</span>
          </div>
          <input type="number" min="0" class="score-input bet-home" data-id="${m.id}" value="${userBet.home}">
        </div>
        <div class="match-row">
          <div class="match-team">
            <img class="flag" src="${getFlagUrl(m.away)}" alt="">
            <span>${m.away}</span>
          </div>
          <input type="number" min="0" class="score-input bet-away" data-id="${m.id}" value="${userBet.away}">
        </div>
      </div>
    `;

    // Запис при промяна на прогнозата
    const homeInp = card.querySelector(".bet-home");
    const awayInp = card.querySelector(".bet-away");

    const saveBet = () => {
      state.bets[m.id] = {
        home: homeInp.value !== "" ? parseInt(homeInp.value, 10) : "",
        away: awayInp.value !== "" ? parseInt(awayInp.value, 10) : ""
      };
      localStorage.setItem("fifa2026_bets", JSON.stringify(state.bets));
    };

    homeInp.addEventListener("input", saveBet);
    awayInp.addEventListener("input", saveBet);

    betsList.append(card);
  });
}

// Зареждане на данни от API
async function updateResults() {
  try {
    const response = await fetch(`${WC_API_BASE}/get/games`, {
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const games = data.games || data || [];

    const newScores = {};
    games.forEach(game => {
      const finished = game.finished === "TRUE" || game.finished === true
                    || game.time_elapsed === "finished";
      const live     = game.time_elapsed && game.time_elapsed !== "notstarted"
                    && game.time_elapsed !== "finished";

      if (!finished && !live) return;

      const matchId = findMatchId(game.home_team_name_en, game.away_team_name_en);
      if (!matchId) return;

      const home = parseInt(game.home_score, 10);
      const away = parseInt(game.away_score, 10);
      if (Number.isFinite(home) && Number.isFinite(away)) {
        newScores[matchId] = { home, away };
      }
    });

    state.scores = newScores;
    state.lastUpdated = new Date().toISOString();
    renderAll();
    if (syncStatus) syncStatus.textContent = `Последно: ${formatSyncTime(state.lastUpdated)}`;

  } catch (error) {
    console.error("FIFA API грешка:", error);
    if (syncStatus) syncStatus.textContent = "Няма връзка с API (Локален режим)";
  }
}

function formatSyncTime(value) {
  if (!value) return "--:--";
  const d = new Date(value);
  return d.toLocaleTimeString("bg-BG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// Първоначален старт
init();

function init() {
  if (groupFilter) {
    Object.keys(groups).forEach((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = `Група ${group}`;
      groupFilter.append(option);
    });
  }

  // Рендерираме празната структура незабавно преди заявката към API
  renderAll();
  
  // Стартираме синка
  updateResults();
  setInterval(updateResults, refreshEveryMs);
}
