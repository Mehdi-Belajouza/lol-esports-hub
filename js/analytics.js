// Player Analytics Dashboard
async function initPlayerAnalytics(playerName) {
    // Fetch player scoreboards data
    const encodedName = encodeURIComponent(playerName);
    const resp = await fetch(`data/scoreboards/${encodedName}_tournament_scoreboards.json`);
    
    if (!resp.ok) {
        console.error(`Failed to load player data for ${playerName}`);
        return;
    }
    
    const games = await resp.json();
    if (!games || !games.length) {
        console.error(`No game data found for ${playerName}`);
        return;
    }
    
    // Initialize tabs
    initAnalyticsTabs();
    
    // Process the data
    const playerStats = processPlayerData(games);
    
    // Render different sections
    renderOverviewTab(playerStats);
    renderPerformanceTab(playerStats, games);
    renderTrendsTab(playerStats, games);
    renderComparisonsTab(playerStats);
}

function initAnalyticsTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current button and tab
            button.classList.add('active');
            const tabId = `${button.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function processPlayerData(games) {
    // Process and aggregate player stats
    const stats = {
        totalGames: games.length,
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        totalCS: 0,
        totalDamage: 0,
        totalGameMinutes: 0,
        champions: {},
        roles: {
            Top: 0,
            Jungle: 0,
            Mid: 0,
            Bot: 0,
            Support: 0
        },
        recentForm: []
    };
    
    // Process each game
    games.forEach(game => {
        // Calculate win/loss
        const teamNum = game.Team === game.Team1 ? 1 : 2;
        const winner = Number(game.Winner);
        const won = winner === teamNum;
        
        if (won) {
            stats.wins++;
        } else {
            stats.losses++;
        }
        
        // KDA stats
        stats.kills += Number(game.Kills) || 0;
        stats.deaths += Number(game.Deaths) || 0;
        stats.assists += Number(game.Assists) || 0;
        
        // CS and damage
        stats.totalCS += Number(game.CS) || 0;
        stats.totalDamage += Number(game.DamageToChampions) || 0;
        
        // Game length
        stats.totalGameMinutes += parseFloat(game["Gamelength Number"]) || 0;
        
        // Track champion stats
        const champion = game.Champion;
        if (champion) {
            if (!stats.champions[champion]) {
                stats.champions[champion] = {
                    name: champion,
                    games: 0,
                    wins: 0,
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    cs: 0,
                    damage: 0
                };
            }
            
            const champStats = stats.champions[champion];
            champStats.games++;
            if (won) champStats.wins++;
            champStats.kills += Number(game.Kills) || 0;
            champStats.deaths += Number(game.Deaths) || 0;
            champStats.assists += Number(game.Assists) || 0;
            champStats.cs += Number(game.CS) || 0;
            champStats.damage += Number(game.DamageToChampions) || 0;
        }
        
        // Track role distribution
        const role = game.Role || "Unknown";
        if (stats.roles.hasOwnProperty(role)) {
            stats.roles[role]++;
        }
        
        // Track recent form (last 10 games)
        if (stats.recentForm.length < 10) {
            stats.recentForm.push({
                champion,
                won,
                kda: `${game.Kills}/${game.Deaths}/${game.Assists}`
            });
        }
    });
    
    // Calculate derived stats
    stats.winRate = stats.totalGames > 0 ? (stats.wins / stats.totalGames) * 100 : 0;
    stats.kda = stats.deaths > 0 ? (stats.kills + stats.assists) / stats.deaths : (stats.kills + stats.assists);
    stats.csPerMin = stats.totalGameMinutes > 0 ? stats.totalCS / stats.totalGameMinutes : 0;
    stats.avgDamage = stats.totalGames > 0 ? stats.totalDamage / stats.totalGames : 0;
    
    // Sort champions by games played
    stats.topChampions = Object.values(stats.champions)
        .map(champ => ({
            ...champ,
            winRate: champ.games > 0 ? (champ.wins / champ.games) * 100 : 0,
            kda: champ.deaths > 0 ? (champ.kills + champ.assists) / champ.deaths : (champ.kills + champ.assists)
        }))
        .sort((a, b) => b.games - a.games)
        .slice(0, 5);
    
    return stats;
}

function renderOverviewTab(stats) {
    // KDA Circle
    const kdaCircle = document.getElementById('kda-circle');
    const kdaValue = document.getElementById('kda-value');
    const kdaPercentage = Math.min(stats.kda / 10 * 100, 100); // Normalize KDA, capping at 10
    const circumference = 2 * Math.PI * 45;
    
    kdaCircle.style.strokeDasharray = circumference;
    kdaCircle.style.strokeDashoffset = circumference - (kdaPercentage / 100 * circumference);
    kdaValue.textContent = stats.kda.toFixed(2);
    
    // Key stats
    document.getElementById('total-games').textContent = stats.totalGames;
    document.getElementById('win-rate').textContent = `${stats.winRate.toFixed(1)}%`;
    document.getElementById('avg-cs').textContent = stats.csPerMin.toFixed(1);
    document.getElementById('avg-damage').textContent = stats.avgDamage.toLocaleString();
    
    // Role distribution
    const roleDistribution = document.getElementById('role-distribution');
    roleDistribution.innerHTML = '';
    
    const roles = Object.entries(stats.roles)
        .filter(([_, count]) => count > 0)
        .sort((a, b) => b[1] - a[1]);
    
    const totalRoleGames = Object.values(stats.roles).reduce((sum, count) => sum + count, 0);
    
    roles.forEach(([role, count]) => {
        const percentage = totalRoleGames > 0 ? (count / totalRoleGames * 100) : 0;
        const bar = document.createElement('div');
        bar.className = 'role-bar';
        bar.style.height = `${percentage}%`;
        bar.dataset.percentage = `${percentage.toFixed(0)}%`;
        bar.dataset.role = role;
        roleDistribution.appendChild(bar);
    });
    
    // Recent form
    const recentForm = document.getElementById('recent-form');
    recentForm.innerHTML = '';
    
    stats.recentForm.reverse().forEach(game => {
        const matchIndicator = document.createElement('div');
        matchIndicator.className = `form-match ${game.won ? 'form-win' : 'form-loss'}`;
        matchIndicator.title = `${game.champion}: ${game.kda} (${game.won ? 'Win' : 'Loss'})`;
        matchIndicator.textContent = game.won ? 'W' : 'L';
        recentForm.appendChild(matchIndicator);
    });
    
    // Mini champion list
    const champList = document.getElementById('mini-champ-list');
    champList.innerHTML = '';
    
    const nameMap = {
        "Kai'Sa": "Kaisa",
        "Kog'Maw": "KogMaw",
        "Cho'Gath": "Chogath",
        "LeBlanc": "Leblanc"
    };
    
    stats.topChampions.slice(0, 4).forEach(champ => {
        const champItem = document.createElement('div');
        champItem.className = 'mini-champ-item';
        
        let imageName = nameMap[champ.name] || champ.name.replace(/[^a-zA-Z]/g, '');
        const winrateColor = champ.winRate >= 60 ? '#28a745' : champ.winRate >= 50 ? '#ffc107' : '#dc3545';
        
        champItem.innerHTML = `
            <img class="mini-champ-icon" src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${imageName}.png" 
                style="border-color: ${winrateColor};" />
            <div class="mini-champ-details">
                <div class="mini-champ-name">${champ.name}</div>
                <div class="mini-champ-stats">
                    KDA: ${champ.kda.toFixed(2)} | 
                    <span class="mini-champ-winrate" style="color: ${winrateColor};">
                        ${champ.winRate.toFixed(0)}% (${champ.wins}W ${champ.games - champ.wins}L)
                    </span>
                </div>
            </div>
        `;
        
        champList.appendChild(champItem);
    });
}

function renderPerformanceTab(stats, games) {
    const tableBody = document.getElementById('game-table-body');
    tableBody.innerHTML = '';
    
    const nameMap = {
        "Kai'Sa": "Kaisa",
        "Kog'Maw": "KogMaw",
        "Cho'Gath": "Chogath",
        "LeBlanc": "Leblanc"
    };
    
    // Sort games by date (most recent first)
    const sortedGames = [...games].sort((a, b) => {
        return new Date(b["DateTime UTC"]) - new Date(a["DateTime UTC"]);
    });
    
    sortedGames.forEach(game => {
        const row = document.createElement('tr');
        
        // Calculate win/loss
        const teamNum = game.Team === game.Team1 ? 1 : 2;
        const winner = Number(game.Winner);
        const won = winner === teamNum;
        
        // Calculate CS per minute
        const csPerMin = (Number(game.CS) || 0) / (parseFloat(game["Gamelength Number"]) || 1);
        
        // Format date
        const gameDate = new Date(game["DateTime UTC"]);
        const formattedDate = gameDate.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Champion image
        let imageName = nameMap[game.Champion] || game.Champion.replace(/[^a-zA-Z]/g, '');
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td class="table-champion">
                <img src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${imageName}.png" alt="${game.Champion}">
                ${game.Champion}
            </td>
            <td>${game.Kills}/${game.Deaths}/${game.Assists}</td>
            <td>${game.CS}</td>
            <td>${csPerMin.toFixed(1)}</td>
            <td>${Number(game.DamageToChampions).toLocaleString()}</td>
            <td class="${won ? 'table-win' : 'table-loss'}">${won ? 'Win' : 'Loss'}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
}
function renderTrendsTab(stats, games) {
    const canvas = document.getElementById('trend-chart');
    if (!canvas) return;

    // Most recent 10 games
    const sorted = [...games].sort((a, b) => new Date(a["DateTime UTC"]) - new Date(b["DateTime UTC"]));
    const trendData = sorted.slice(-10).map(g => ({
        date: new Date(g["DateTime UTC"]).toLocaleDateString(),
        kda: (Number(g.Kills) + Number(g.Assists)) / (Number(g.Deaths) || 1),
        csPerMin: (Number(g.CS) || 0) / (parseFloat(g["Gamelength Number"]) || 1)
    }));

    const labels = trendData.map(g => g.date);
    const kdaValues = trendData.map(g => g.kda.toFixed(2));
    const csValues = trendData.map(g => g.csPerMin.toFixed(2));

    new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: "KDA",
                    data: kdaValues,
                    borderColor: "#ff4655",
                    backgroundColor: "rgba(255,70,85,0.2)",
                    tension: 0.4
                },
                {
                    label: "CS/Min",
                    data: csValues,
                    borderColor: "#28a745",
                    backgroundColor: "rgba(40,167,69,0.2)",
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


