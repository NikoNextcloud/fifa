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
  "Mexico": "Мексико", "South Africa": "Южна Африка", "South Korea": "Южна Корея", "Czechia": "Чехия",
  "Canada": "Канада", "Bosnia and Herzegovina": "Босна и Херцеговина", "Qatar": "Катар", "Switzerland": "Швейцария",
  "Brazil": "Бразилия", "Morocco": "Мароко", "Haiti": "Хаити", "Scotland": "Шотландия",
  "United States": "САЩ", "Paraguay": "Парагвай", "Australia": "Австралия", "Turkey": "Турция",
  "Germany": "Германия", "Curacao": "Кюрасао", "Ivory Coast": "Кот д'Ивоар", "Ecuador": "Еквадор",
  "Netherlands": "Нидерландия", "Japan": "Япония", "Sweden": "Швеция", "Tunisia": "Тунис",
  "Belgium": "Белгия", "Egypt": "Египет", "Iran": "Иран", "New Zealand": "Нова Зеландия",
  "Spain": "Испания", "Cape Verde": "Кабо Верде", "Saudi Arabia": "Саудитска Арабия", "Uruguay": "Уругвай",
  "France": "Франция", "Senegal": "Сенегал", "Iraq": "Ирак", "Norway": "Норвегия",
  "Argentina": "Аржентина", "Algeria": "Алжир", "Austria": "Австрия", "Jordan": "Йордания",
  "Portugal": "Португалия", "DR Congo": "ДР Конго", "Uzbekistan": "Узбекистан", "Colombia": "Колумбия",
  "England": "Англия", "Croatia": "Хърватия", "Ghana": "Гана", "Panama": "Панама"
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

const groupDateNums = {
  A: [11, 12, 18, 18, 24, 24], B: [12, 13, 18, 18, 24, 24], C: [13, 13, 19, 19, 24, 24],
  D: [12, 13, 19, 19, 25, 25], E: [14, 14, 20, 20, 25, 25], F: [14, 14, 20, 20, 25, 25],
  G: [15, 15, 21, 21, 26, 26], H: [15, 15, 21, 21, 26, 26], I: [16, 16, 22, 22, 26, 26],
  J: [16, 16, 22, 22, 27, 27], K: [17, 17, 23, 23, 27, 27], L: [17, 17, 23, 23, 27, 27]
};

const matchDetails = [
  { time: "22:00 ч.", timeNum: 2200, location: "Мексико, Дистрито Федерал (Estadio Azteca)" },
  { time: "01:00 ч.", timeNum: 100,  location: "САЩ, Калифорния (SoFi Stadium)" },
  { time: "19:00 ч.", timeNum: 1900, location: "Канада, Онтарио (BMO Field)" },
  { time: "23:00 ч.", timeNum: 2300, location: "САЩ, Тексас (AT&T Stadium)" },
  { time: "18:00 ч.", timeNum: 1800, location: "САЩ, Ню Йорк / Ню Джърси (MetLife Stadium)" },
  { time: "21:00 ч.", timeNum: 2100, location: "САЩ, Флорида (Hard Rock Stadium)" }
];

const pairings = [ [0, 1], [2, 3], [0, 2], [3, 1], [3, 0], [1, 2] ];

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

function setView(name) {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === name);
  });

  Object.entries(views).forEach(([viewName, element]) => {
    if (element) {
      if (viewName === name) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  });
}

function getFlagUrl(teamName) {
  const code = teamCountryCodes[teamName] || "un";
  return `https://flagcdn.com/w40/${code}.png`;
}

function isPlayed(score) {
  return score && score.home !== undefined && score.away !== undefined && score.home !== null && score.away !== null && score.home !== "" && score.away !== "";
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

function getMatchStoryPercentages(homeTeam, awayTeam) {
  const seed = homeTeam.length + awayTeam.length;
  const homeWin = 35 + (seed % 25);
  const awayWin = 25 + ((seed * 3) % 20);
  const draw = 100 - homeWin - awayWin;
  return { homeWin, draw, awayWin };
}

function calculateTable(group) {
  const rows = groups[group].map((team) => ({
    team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
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
        home.won += 1; away.lost += 1; home.points += 3;
      } else if (awayGoals > homeGoals) {
        away.won += 1; home.lost += 1; away.points += 3;
      } else {
        home.drawn += 1; away.drawn += 1; home.points += 1; away.points += 1;
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

function renderGroups() {
  if (!groupsView) return;
  groupsView.innerHTML = "";

  Object.entries(groups).forEach(([group, teams]) => {
    const table = calculateTable(group);
    const leader = bg(table[0]?.team) || "няма";
    const card = document.createElement("article");
    card.className = "group-card";
    
    let teamsHTML = teams.map((team) => {
      return `
        <div class="team-row" style="display:flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 8px 0;">
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
      `;
    }).join("");

    card.innerHTML = `
      <div class="group-title">
        <h2>Група ${group}</h2>
        <span class="pill">Лидер: ${leader}</span>
      </div>
      ${teamsHTML}
    `;
    groupsView.append(card);
  });
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
  });

  if (visibleMatches.length === 0) {
    matchesList.innerHTML = "<p style='color:var(--muted); padding:20px;'>Няма мачове, отговарящи на филтрите.</p>";
    return;
  }

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
      <div style="font-size: 11px; color: var(--muted); margin-bottom: 12px; display: flex; align-items: center; gap: 4px;">
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
        ${match.location}
      </div>
      <div class="score-line" style="margin-bottom: 6px;">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.home)}" alt="" style="width: 24px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.1)">
          ${bg(match.home)}
        </strong>
        <input inputmode="numeric" min="0" type="number" value="${score.home !== undefined ? score.home : ""}" disabled>
      </div>
      <div class="score-line">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.away)}" alt="" style="width: 24px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.1)">
          ${bg(match.away)}
        </strong>
        <input inputmode="numeric" min="0" type="number" value="${score.away !== undefined ? score.away : ""}" disabled>
      </div>
      <div class="score-actions" style="display:flex; flex-direction: column; align-items: flex-start; gap: 6px; border-top: 1px solid var(--line); margin-top: 12px; padding-top: 10px;">
        ${played ? `
          <span class="status" style="color: var(--green); font-weight: bold;">Краен резултат: ${matchResultText(match, score)}</span>
        ` : `
          <div style="width: 100%;">
            <span class="status" style="font-size: 11px; color: var(--gold);">📊 Вероятност за победа (Matchstory):</span>
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: #fff; margin-top: 4px; background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 4px;">
              <span>1 (${bg(match.home)}): <b>${story.homeWin}%</b></span>
              <span>X (Равен): <b>${story.draw}%</b></span>
              <span>2 (${bg(match.away)}): <b>${story.awayWin}%</b></span>
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

    let actionsHTML = "";
    if (played) {
      const hasBet = bet.home !== "" && bet.away !== "";
      if (!hasBet) {
        actionsHTML = `<span class="status" style="color: var(--muted)">Няма направена прогноза</span>`;
      } else {
        const exact = Number(bet.home) === score.home && Number(bet.away) === score.away;
        const betWinner = Number(bet.home) > Number(bet.away) ? match.home : Number(bet.away) > Number(bet.home) ? match.away : "draw";
        const realWinner = score.home > score.away ? match.home : score.away > score.home ? match.away : "draw";
        const correctResult = betWinner === realWinner;
        actionsHTML = `
          <span class="status">Прогноза: <b style="color:var(--gold)">${bet.home} : ${bet.away}</b> &nbsp;|&nbsp; Реално: <b style="color:#fff">${score.home} : ${score.away}</b></span>
          <span class="status" style="font-weight: bold; color: ${exact ? "var(--green)" : correctResult ? "var(--blue)" : "var(--red)"}">
            ${exact ? "✅ Точен резултат!" : correctResult ? "🟡 Верен победител" : "❌ Не позна"}
          </span>
        `;
      }
    } else {
      actionsHTML = `<span class="status" style="color: var(--muted)">Мачът не е изигран</span>`;
    }

    card.innerHTML = `
      <div class="match-top">
        <span class="match-meta">Група ${match.group} • ${match.date} в ${match.time}</span>
        <span class="status" style="color: var(--gold)">Прогноза</span>
      </div>
      <div class="score-line" style="margin-bottom: 6px;">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.home)}" alt="" style="width: 24px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.1)">
          ${bg(match.home)}
        </strong>
        <input class="bet-input" data-match-id="${match.id}" data-type="home" inputmode="numeric" min="0" type="number" value="${bet.home}" ${played ? "disabled" : ""}>
      </div>
      <div class="score-line">
        <strong style="display: flex; align-items: center; gap: 8px;">
          <img src="${getFlagUrl(match.away)}" alt="" style="width: 24px; border-radius: 3px; border: 1px solid rgba(255,255,255,0.1)">
          ${bg(match.away)}
        </strong>
        <input class="bet-input" data-match-id="${match.id}" data-type="away" inputmode="numeric" min="0" type="number" value="${bet.away}" ${played ? "disabled" : ""}>
      </div>
      <div class="score-actions" style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--line); display: flex; justify-content: space-between; align-items: center; width: 100%;">
        ${actionsHTML}
      </div>
    `;

    card.querySelectorAll(".bet-input").forEach(input => {
      input.addEventListener("input", (e) => {
        const matchId = e.target.dataset.matchId;
        const type = e.target.dataset.type;
        if (!state.userBets[matchId]) state.userBets[matchId] = { home: "", away: "" };
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
    
    let tableRowsHTML = table.map((row) => {
      return `
        <tr style="border-top: 1px solid rgba(255,255,255,0.04);">
          <td style="padding: 8px 0; display: flex; align-items: center; gap: 6px;">
            <img src="${getFlagUrl(row.team)}" alt="" style="width: 16px; border-radius: 2px;">
            ${bg(row.team)}
          </td>
          <td>${row.played}</td>
          <td>${row.goalDifference}</td>
          <td style="font-weight: bold; color: var(--gold);">${row.points}</td>
        </tr>
      `;
    }).join("");

    card.innerHTML = `
      <h2>Група ${group}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="color: var(--muted); text-align: left;">
            <th style="padding-bottom: 8px;">Отбор</th>
            <th>М</th>
            <th>ГР</th>
            <th>Т</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHTML}
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

  if (playedCount) playedCount.textContent = `${played}/${matches.length}`;
  if (goalsCount) goalsCount.textContent = goals;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (stageLabel) stageLabel.textContent = played < matches.length ? "Групи" : "Елиминации";
}

function renderAll() {
  renderGroups();
  renderMatches();
  renderBets();
  renderStandings();
  renderProgress();
}

async function updateResults() {
  if (syncStatus) syncStatus.textContent = "Обновяване...";
  try {
    // Reading from localized relative URL which works cleanly anywhere (local folder or GitHub Pages)
    const response = await fetch("results.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    // Parse user's specific results.json format: { "matches": { "A-1": { "home": 2, "away": 0 } } }
    if (data && data.matches) {
      state.scores = data.matches;
    }
    
    state.lastUpdated = data.updatedAt || new Date().toISOString();
    renderAll();
    if (syncStatus) syncStatus.textContent = `Последно: ${formatSyncTime(state.lastUpdated)}`;
  } catch (error) {
    console.error("Грешка при четене на резултати:", error);
    if (syncStatus) syncStatus.textContent = "Локален JSON";
    // Fallback: render anyway so it never stays blank!
    renderAll();
  }
}

function formatSyncTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "неизвестно";
  return date.toLocaleTimeString("bg-BG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function init() {
  if (groupFilter) {
    Object.keys(groups).forEach((group) => {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = `Група ${group}`;
      groupFilter.append(option);
    });
  }
  // Guarantee a first-pass render before fetching
  renderAll();
  setView("groups");
  updateResults();
  setInterval(updateResults, 60000);
}

// Fire the application up safely
document.addEventListener("DOMContentLoaded", init);
