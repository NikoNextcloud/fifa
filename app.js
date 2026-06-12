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

const teamKeyPlayers = {
  "Mexico": "Santiago Giménez, Edson Álvarez", "South Africa": "Percy Tau, Ronwen Williams", 
  "South Korea": "Son Heung-min, Kim Min-jae", "Czechia": "Tomáš Souček, Patrik Schick",
  "Canada": "Alphonso Davies, Jonathan David", "Bosnia and Herzegovina": "Edin Džeko, Ermedin Demirović", 
  "Qatar": "Akram Afif, Almoez Ali", "Switzerland": "Granit Xhaka, Manuel Akanji",
  "Brazil": "Vinícius Júnior, Rodrygo", "Morocco": "Achraf Hakimi, Brahim Díaz", 
  "Haiti": "Frantzdy Pierrot, Duckens Nazon", "Scotland": "Andrew Robertson, Scott McTominay",
  "United States": "Christian Pulisic, Weston McKennie", "Paraguay": "Miguel Almirón, Julio Enciso", 
  "Australia": "Mathew Ryan, Harry Souttar", "Turkey": "Hakan Çalhanoğlu, Arda Güler",
  "Germany": "Florian Wirtz, Jamal Musiala", "Curacao": "Juninho Bacuna, Leandro Bacuna", 
  "Ivory Coast": "Franck Kessié, Sébastien Haller", "Ecuador": "Moises Caicedo, Enner Valencia",
  "Netherlands": "Virgil van Dijk, Cody Gakpo", "Japan": "Kaoru Mitoma, Wataru Endo", 
  "Sweden": "Alexander Isak, Viktor Gyökeres", "Tunisia": "Ellyes Skhiri, Aissa Laïdouni",
  "Belgium": "Kevin De Bruyne, Romelu Lukaku", "Egypt": "Mohamed Salah, Omar Marmoush", 
  "Iran": "Mehdi Taremi, Sardar Azmoun", "New Zealand": "Chris Wood, Liberato Cacace",
  "Spain": "Lamine Yamal, Rodri", "Cape Verde": "Ryan Mendes, Bebé", 
  "Saudi Arabia": "Salem Al-Dawsari, Firas Al-Buraikan", "Uruguay": "Federico Valverde, Darwin Núñez",
  "France": "Kylian Mbappé, Antoine Griezmann", "Senegal": "Sadio Mané, Nicolas Jackson", 
  "Iraq": "Aymen Hussein, Ali Jasim", "Norway": "Erling Haaland, Martin Ødegaard",
  "Argentina": "Lionel Messi, Lautaro Martínez", "Algeria": "Riyad Mahrez, Said Benrahma", 
  "Austria": "Marcel Sabitzer, Konrad Laimer", "Jordan": "Musa Al-Taamari, Yazan Al-Naimat",
  "Portugal": "Cristiano Ronaldo, Bruno Fernandes", "DR Congo": "Chancel Mbemba, Yoane Wissa", 
  "Uzbekistan": "Eldor Shomurodov, Abbosbek Fayzullaev", "Colombia": "Luis Díaz, James Rodríguez",
  "England": "Jude Bellingham, Harry Kane", "Croatia": "Luka Modrić, Joško Gvardiol", 
  "Ghana": "Mohammed Kudus, Inaki Williams", "Panama": "Adalberto Carrasquilla, José Fajardo"
};


const teamNamesBG = {
  "Mexico":                 "Мексико",
  "South Africa":           "Южна Африка",
  "South Korea":            "Южна Корея",
  "Czechia":                "Чехия",
  "Canada":                 "Канада",
  "Bosnia and Herzegovina": "Босна и Херцеговина",
  "Qatar":                  "Катар",
  "Switzerland":            "Швейцария",
  "Brazil":                 "Бразилия",
  "Morocco":                "Мароко",
  "Haiti":                  "Хаити",
  "Scotland":               "Шотландия",
  "United States":          "САЩ",
  "Paraguay":               "Парагвай",
  "Australia":              "Австралия",
  "Turkey":                 "Турция",
  "Germany":                "Германия",
  "Curacao":                "Кюрасао",
  "Ivory Coast":            "Кот д'Ивоар",
  "Ecuador":                "Еквадор",
  "Netherlands":            "Нидерландия",
  "Japan":                  "Япония",
  "Sweden":                 "Швеция",
  "Tunisia":                "Тунис",
  "Belgium":                "Белгия",
  "Egypt":                  "Египет",
  "Iran":                   "Иран",
  "New Zealand":            "Нова Зеландия",
  "Spain":                  "Испания",
  "Cape Verde":             "Кабо Верде",
  "Saudi Arabia":           "Саудитска Арабия",
  "Uruguay":                "Уругвай",
  "France":                 "Франция",
  "Senegal":                "Сенегал",
  "Iraq":                   "Ирак",
  "Norway":                 "Норвегия",
  "Argentina":              "Аржентина",
  "Algeria":                "Алжир",
  "Austria":                "Австрия",
  "Jordan":                 "Йордания",
  "Portugal":               "Португалия",
  "DR Congo":               "ДР Конго",
  "Uzbekistan":             "Узбекистан",
  "Colombia":               "Колумбия",
  "England":                "Англия",
  "Croatia":                "Хърватия",
  "Ghana":                  "Гана",
  "Panama":                 "Панама"
};

function bg(name) {
  return teamNamesBG[name] || name;
}

const groupDates = {
  A: ["11 юни", "12 юни", "18 юни", "18 юни", "24 юни", "24 юни"],
  B: ["12 юни", "13 юни", "18 юни", "18 юни", "24 юни", "24 юни"],
  C: ["13 юни", "13 юни", "19 юни", "19 юни", "24 юни", "24 юни"],
  D: ["12 юни", "13 юни", "19 юни", "19 юни", "25 юни", "25 юни"],
  E: ["14 юни", "14 юни", "20 юни", "20 юни", "25 юни", "25 юни"],
  F: ["14 юни", "14 юни", "20 юни", "20 юни", "25 юни", "25 юни"],
  G: ["15 юни", "15 юни", "21 юни", "21 юни", "26 юни", "26 юни"],
  H: ["15 юни", "15 юни", "21 юни", "21 юни", "26 юни", "26 юни"],
  I: ["16 юни", "16 юни", "22 юни", "22 юни", "26 юни", "26 юни"],
  J: ["16 юни", "16 юни", "22 юни", "22 юни", "27 юни", "27 юни"],
  K: ["17 юни", "17 юни", "23 юни", "23 юни", "27 юни", "27 юни"],
  L: ["17 юни", "17 юни", "23 юни", "23 юни", "27 юни", "27 юни"]
};

// Числова стойност на дата за сортиране (ден от юни 2026)
const groupDateNums = {
  A: [11, 12, 18, 18, 24, 24],
  B: [12, 13, 18, 18, 24, 24],
  C: [13, 13, 19, 19, 24, 24],
  D: [12, 13, 19, 19, 25, 25],
  E: [14, 14, 20, 20, 25, 25],
  F: [14, 14, 20, 20, 25, 25],
  G: [15, 15, 21, 21, 26, 26],
  H: [15, 15, 21, 21, 26, 26],
  I: [16, 16, 22, 22, 26, 26],
  J: [16, 16, 22, 22, 27, 27],
  K: [17, 17, 23, 23, 27, 27],
  L: [17, 17, 23, 23, 27, 27]
};

const matchDetails = [
  { time: "22:00 ч.", timeNum: 2200, location: "Мексико, Дистрито Федерал (Estadio Azteca)" },
  { time: "01:00 ч.", timeNum: 100,  location: "САЩ, Калифорния (SoFi Stadium)" },
  { time: "19:00 ч.", timeNum: 1900, location: "Канада, Онтарио (BMO Field)" },
  { time: "23:00 ч.", timeNum: 2300, location: "САЩ, Тексас (AT&T Stadium)" },
  { time: "18:00 ч.", timeNum: 1800, location: "САЩ, Ню Йорк / Ню Джърси (MetLife Stadium)" },
  { time: "21:00 ч.", timeNum: 2100, location: "САЩ, Флорида (Hard Rock Stadium)" }
];

const pairings = [
  [0, 1],
  [2, 3],
  [0, 2],
  [3, 1],
  [3, 0],
  [1, 2]
];

// ============================================================
// worldcup26.ir API конфигурация — без нужда от токен!
// ============================================================
const WC_API_BASE = "https://worldcup26.ir";
const refreshEveryMs = 60000;

// Съответствие между имена в API-то и имената в твоя проект
const apiNameMap = {
  "South Korea":     "South Korea",
  "Czech Republic":  "Czechia",
  "Bosnia":          "Bosnia and Herzegovina",
  "Curaçao":         "Curacao",
  "Ivory Coast":     "Ivory Coast",
  "DR Congo":        "DR Congo",
  "Türkiye":         "Turkey",
  "Turkiye":         "Turkey",
};

function normalizeApiTeamName(name) {
  return apiNameMap[name] || name;
}

// Намери match ID по двата отбора
function findMatchId(homeEn, awayEn) {
  const home = normalizeApiTeamName(homeEn);
  const away = normalizeApiTeamName(awayEn);
  const found = matches.find(m => m.home === home && m.away === away);
  return found ? found.id : null;
}

const matches = Object.entries(groups).flatMap(([group, teams]) =>
  pairings.map(([homeIndex, awayIndex], index) => ({
    id: `${group}-${index + 1}`,
    group,
    date: groupDates[group][index],
    dateNum: groupDateNums[group][index],
    time: matchDetails[index].time,
    timeNum: matchDetails[index].timeNum,
    location: matchDetails[index].location,
    home: teams[homeIndex],
    away: teams[awayIndex]
  }))
).sort((a, b) => a.dateNum - b.dateNum || a.timeNum - b.timeNum);

const state = {
  scores: {},
  userBets: JSON.parse(localStorage.getItem("fifa2026_bets")) || {},
  lastUpdated: "",
  groupFilter: "all",
  statusFilter: "all"
};

const views = {
  groups: document.querySelector("#groupsView"),
  matches: document.querySelector("#matchesView"),
  standings: document.querySelector("#standingsView"),
  bracket: document.querySelector("#bracketView"),
  bets: document.querySelector("#betsView")
};

const groupsView = document.querySelector("#groupsView");
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

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

groupFilter.addEventListener("change", () => {
  state.groupFilter = groupFilter.value;
  renderMatches();
});

statusFilter.addEventListener("change", () => {
  state.statusFilter = statusFilter.value;
  renderMatches();
});

init();

function init() {
  Object.keys(groups).forEach((group) => {
    const option = document.createElement("option");
    option.value = group;
    option.textContent = `Група ${group}`;
    groupFilter.append(option);
  });

  renderAll();
  updateResults();
  setInterval(updateResults, refreshEveryMs);
}

function setView(name) {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === name);
  });

  Object.entries(views).forEach(([viewName, element]) => {
    if(element) {
      element.classList.toggle("active-view", viewName === name);
    }
  });
}

function renderAll() {
  renderGroups();
  renderMatches();
  renderBets();
  renderStandings();
  renderProgress();
}

function getFlagUrl(teamName) {
  const code = teamCountryCodes[teamName] || "un";
  return `https://flagcdn.com/w40/${code}.png`;
}

function renderGroups() {
  if (!groupsView) return;
  groupsView.innerHTML = "";

  Object.entries(groups).forEach(([group, teams]) => {
    const table = calculateTable(group);
    const leader = bg(table[0]?.team) || "няма";
    const card = document.createElement("article");
    card.className = "group-card";
    card.innerHTML = `
      <div class="group-title">
        <h2>Група ${group}</h2>
        <span class="pill">Лидер: ${leader}</span>
      </div>
      ${teams.map((team) => `
        <div class="team-row" style="flex-direction: column; align-items: flex-start; gap: 4px; padding: 8px 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <span class="team-name" style="display: flex; align-items: center; gap: 8px;">
              <img src="${getFlagUrl(team)}" alt="" style="width: 20px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.1)">
              ${bg(team)}
            </span>
            <span class="team-meta">${teamMatchesPlayed(team)} мача</span>
          </div>
          <div style="font-size: 11px; color: var(--muted); padding-left: 28px;">
            <span style="color: var(--gold)">★</span> ${teamKeyPlayers[team] || "В процес на обновяване"}
          </div>
        </div>
      `).join("")}
    `;
    groupsView.append(card);
  });
}

function getMatchStoryPercentages(homeTeam, awayTeam) {
  const seed = homeTeam.length + awayTeam.length;
  const homeWin = 35 + (seed % 25);
  const awayWin = 25 + ((seed * 3) % 20);
  const draw = 100 - homeWin - awayWin;
  return { homeWin, draw, awayWin };
}

function renderMatches() {
  if (!matchesList) return;
  matchesList.innerHTML = "";

  const visibleMatches = matches.filter((match) => {
    const score = state.scores[match.id];
    const played = isPlayed(score);
    const groupMatches = state.groupFilter === "all" || match.group === state.groupFilter;
    const statusMatches = state.statusFilter === "all" || (state.statusFilter === "played" ? played : !played);
    return groupMatches && statusMatches;
  }).sort((a, b) => a.dateNum - b.dateNum || a.timeNum - b.timeNum);

  visibleMatches.forEach((match) => {
    const score = state.scores[match.id] || { home: "", away: "" };
    const played = isPlayed(score);
    const card = document.createElement("article");
    card.className = "match-card";
    
    const story = getMatchStoryPercentages(match.home, match.away);

    card.innerHTML = `
      <div class="match-top">
        <span class="match-meta">Група ${match.group} • ${match.date} в ${match.time}</span>
        <span class="status ${played ? "result-badge" : ""}">${played ? "Изигран" : "Предстоящ"}</span>
      </div>
      <div style="font-size: 11px; color: rgba(255,255,255,0.38); margin-bottom: 14px; display: flex; align-items: center; gap: 5px;">
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
        ${match.location}
      </div>
      <div class="score-line" style="margin-bottom: 6px;">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.home)}" alt="" style="width: 26px; border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.4);">
          ${bg(match.home)}
        </strong>
        <input inputmode="numeric" min="0" type="number" value="${score.home}" aria-label="${match.home}" disabled>
      </div>
      <div class="score-line">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.away)}" alt="" style="width: 26px; border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.4);">
          ${bg(match.away)}
        </strong>
        <input inputmode="numeric" min="0" type="number" value="${score.away}" aria-label="${match.away}" disabled>
      </div>
      
      <div class="score-actions" style="flex-direction: column; align-items: flex-start; gap: 6px; border-top: 1px solid rgba(255,255,255,0.08); margin-top: 14px; padding-top: 12px;">
        ${played ? `
          <span class="status" style="color: #35c08a; font-weight: 800; font-size: 13px; letter-spacing: 0.3px;">✓ ${matchResultText(match, score)}</span>
        ` : `
          <div style="width: 100%;">
            <span class="status" style="font-size: 11px; color: #f0c56a; font-weight: 700; letter-spacing: 0.3px;">⚽ Вероятност за победа:</span>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #fff; margin-top: 4px; background: rgba(255,255,255,0.06); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.07);">
              <span>1 (${match.home}): <b>${story.homeWin}%</b></span>
              <span>X (Равен): <b>${story.draw}%</b></span>
              <span>2 (${match.away}): <b>${story.awayWin}%</b></span>
            </div>
          </div>
        `}
      </div>
    `;

    matchesList.append(card);
  });
}

function renderBets() {
  if (!betsList) return;
  betsList.innerHTML = "";

  matches.forEach((match) => {
    const bet = state.userBets[match.id] || { home: "", away: "" };
    const score = state.scores[match.id];
    const played = isPlayed(score);
    
    const card = document.createElement("article");
    card.className = "match-card";
    
    card.innerHTML = `
      <div class="match-top">
        <span class="match-meta">Група ${match.group} • ${match.date} в ${match.time}</span>
        <span class="status" style="color: var(--gold)">Прогноза</span>
      </div>
      <div class="score-line" style="margin-bottom: 6px;">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.home)}" alt="" style="width: 26px; border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.4);">
          ${bg(match.home)}
        </strong>
        <input class="bet-input" data-match-id="${match.id}" data-type="home" inputmode="numeric" min="0" type="number" value="${bet.home}" aria-label="${match.home}">
      </div>
      <div class="score-line">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.away)}" alt="" style="width: 26px; border-radius: 3px; box-shadow: 0 1px 4px rgba(0,0,0,0.4);">
          ${bg(match.away)}
        </strong>
        <input class="bet-input" data-match-id="${match.id}" data-type="away" inputmode="numeric" min="0" type="number" value="${bet.away}" aria-label="${match.away}">
      </div>
      <div class="score-actions" style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--line); display: flex; justify-content: space-between; align-items: center; width: 100%;">
        ${played ? `
          <span class="status">Реално: <b style="color:var(--ink)">${score.home} : ${score.away}</b></span>
          <span class="status" style="font-weight: bold; color: ${(Number(bet.home) === score.home && Number(bet.away) === score.away) ? 'var(--green)' : 'var(--red)'}">
            ${(Number(bet.home) === score.home && Number(bet.away) === score.away) ? "✅ Точен!" : "❌ Не позна"}
          </span>
        ` : `<span class="status" style="color: var(--muted)">Мачът не е изигран</span>`}
      </div>
    `;

    card.querySelectorAll(".bet-input").forEach(input => {
      input.addEventListener("input", (e) => {
        const matchId = e.target.dataset.matchId;
        const type = e.target.dataset.type;
        
        if (!state.userBets[matchId]) {
          state.userBets[matchId] = { home: "", away: "" };
        }
        
        state.userBets[matchId][type] = e.target.value;
        localStorage.setItem("fifa2026_bets", JSON.stringify(state.userBets));
      });
    });

    betsList.append(card);
  });
}

function renderStandings() {
  if (!standingsGrid) return;
  standingsGrid.innerHTML = "";

  Object.keys(groups).forEach((group) => {
    const table = calculateTable(group);
    const card = document.createElement("article");
    card.className = "table-card";
    card.innerHTML = `
      <h2>Група ${group}</h2>
      <table>
        <thead>
          <tr>
            <th>Отбор</th>
            <th>М</th>
            <th>ГР</th>
            <th>Т</th>
          </tr>
        </thead>
        <tbody>
          ${table.map((row) => `
            <tr>
              <td style="display: flex; align-items: center; gap: 6px;">
                <img src="${getFlagUrl(row.team)}" alt="" style="width: 16px; border-radius: 2px;">
                ${bg(row.team)}
              </td>
              <td>${row.played}</td>
              <td>${row.goalDifference}</td>
              <td>${row.points}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    standingsGrid.append(card);
  });
}

function renderProgress() {
  const played = matches.filter((match) => isPlayed(state.scores[match.id])).length;
  const goals = matches.reduce((sum, match) => {
    const score = state.scores[match.id];
    if (!isPlayed(score)) return sum;
    return sum + Number(score.home) + Number(score.away);
  }, 0);
  const percent = Math.round((played / matches.length) * 100);

  if(playedCount) playedCount.textContent = `${played}/${matches.length}`;
  if(goalsCount) goalsCount.textContent = goals;
  if(progressPercent) progressPercent.textContent = `${percent}%`;
  if(progressFill) progressFill.style.width = `${percent}%`;
  if(stageLabel) stageLabel.textContent = played < matches.length ? "Групи" : "Елиминации";
}

function calculateTable(group) {
  const rows = groups[group].map((team) => ({
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
  }));

  const byTeam = Object.fromEntries(rows.map((row) => [row.team, row]));

  matches
    .filter((match) => match.group === group)
    .forEach((match) => {
      const score = state.scores[match.id];
      if (!isPlayed(score)) return;

      const home = byTeam[match.home];
      const away = byTeam[match.away];
      const homeGoals = Number(score.home);
      const awayGoals = Number(score.away);

      home.played += 1;
      away.played += 1;
      home.goalsFor += homeGoals;
      home.goalsAgainst += awayGoals;
      away.goalsFor += awayGoals;
      away.goalsAgainst += homeGoals;

      if (homeGoals > awayGoals) {
        home.won += 1;
        away.lost += 1;
        home.points += 3;
      } else if (awayGoals > homeGoals) {
        away.won += 1;
        home.lost += 1;
        away.points += 3;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }
    });

  rows.forEach((row) => {
    row.goalDifference = row.goalsFor - row.goalsAgainst;
  });

  return rows.sort((a, b) =>
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor ||
    a.team.localeCompare(b.team)
  );
}

function teamMatchesPlayed(team) {
  return matches.filter((match) => {
    const score = state.scores[match.id];
    return isPlayed(score) && (match.home === team || match.away === team);
  }).length;
}

function matchResultText(match, score) {
  const home = Number(score.home);
  const away = Number(score.away);
  if (home > away) return `${bg(match.home)} печели`;
  if (away > home) return `${bg(match.away)} печели`;
  return "Равенство";
}

function isPlayed(score) {
  return score && score.home !== "" && score.away !== "" && Number.isFinite(Number(score.home)) && Number.isFinite(Number(score.away));
}

async function updateResults() {
  if (syncStatus) syncStatus.textContent = "Обновяване...";

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

      if (!finished && !live) return; // предстоящ мач

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
    if (syncStatus) syncStatus.textContent = "Няма връзка с API";
  }
}

function formatSyncTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "неизвестно";

  return date.toLocaleTimeString("bg-BG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}