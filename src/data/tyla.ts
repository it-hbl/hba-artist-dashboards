export const tylaPlaylists = {
  spotify: [
    { playlist: "Today's Top Hits", owner: "Spotify", peakPosition: 1, currentPosition: "11 / 50", daysOn: 97 },
    { playlist: "Hot Hits Philippines", owner: "Spotify", peakPosition: 4, currentPosition: "22 / 50", daysOn: 84 },
    { playlist: "Workout", owner: "Spotify", peakPosition: 2, currentPosition: "6 / 93", daysOn: 83 },
    { playlist: "big on the internet", owner: "Spotify", peakPosition: 1, currentPosition: "30 / 50", daysOn: 98 },
    { playlist: "Party Hits", owner: "Spotify", peakPosition: 32, currentPosition: "32 / 100", daysOn: 90 },
    { playlist: "Good Vibes", owner: "Spotify", peakPosition: 4, currentPosition: "12 / 100", daysOn: 97 },
    { playlist: "Top 50 - USA", owner: "spotifycharts", peakPosition: 23, currentPosition: "48 / 50", daysOn: 38 },
    { playlist: "Pop Rising", owner: "Spotify", peakPosition: 1, currentPosition: "51 / 100", daysOn: 119 },
    { playlist: "Hot Hits UK", owner: "Spotify", peakPosition: 12, currentPosition: "33 / 70", daysOn: 88 },
    { playlist: "just hits", owner: "Spotify", peakPosition: 1, currentPosition: "1 / 100", daysOn: 41 },
    { playlist: "Women of Pop", owner: "Spotify", peakPosition: 5, currentPosition: "5 / 75", daysOn: 6 },
    { playlist: "Academic Comeback", owner: "Spotify", peakPosition: 46, currentPosition: "46 / 100", daysOn: 3 },
  ],
  appleMusic: [
    { playlist: "Pop Delights", curator: "Apple Music Pop", country: "DE", currentPosition: "73 / 92", daysOn: 6 },
    { playlist: "2025 triple j's Hottest 200", curator: "Apple Music Alternative", country: "KY", currentPosition: "92 / 99", daysOn: 19 },
    { playlist: "All the Way Up", curator: "Apple Music 힙합/랩", country: "US", currentPosition: "4 / 93", daysOn: 24 },
    { playlist: "Acuario", curator: "Apple Music", country: "UY", currentPosition: "5 / 25", daysOn: 31 },
    { playlist: "Today's Easy Hits", curator: "Apple Music Éxitos", country: "FR", currentPosition: "10 / 99", daysOn: 33 },
    { playlist: "New Fire 🔥", curator: "Apple Music Alternativa", country: "AU", currentPosition: "40 / 101", daysOn: 38 },
    { playlist: "Viral Pop", curator: "Apple Music", country: "US", currentPosition: "21 / 55", daysOn: 38 },
    { playlist: "Today's Hits: International", curator: "Apple Music Éxitos", country: "US", currentPosition: "13 / 53", daysOn: 41 },
    { playlist: "Party Starters", curator: "Apple Music Pop", country: "US", currentPosition: "98 / 100", daysOn: 53 },
    { playlist: "Pop Workout", curator: "Apple Music Fitness", country: "CA", currentPosition: "143 / 249", daysOn: 53 },
  ],
  amazon: [
    { playlist: "MOBO Awards 2026", owner: "Amazon Music", country: "DE", currentPosition: "9 / 76", daysOn: 1 },
    { playlist: "Tween Spot", owner: "Amazon Music", country: "US", currentPosition: "16 / 46", daysOn: 8 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "AU", currentPosition: "5 / 37", daysOn: 10 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "JP", currentPosition: "5 / 37", daysOn: 10 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "DE", currentPosition: "5 / 37", daysOn: 10 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "CA", currentPosition: "5 / 38", daysOn: 10 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "GB", currentPosition: "5 / 37", daysOn: 10 },
    { playlist: "2026!", owner: "Amazon Music", country: "FR", currentPosition: "96 / 100", daysOn: 10 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "US", currentPosition: "5 / 38", daysOn: 11 },
    { playlist: "R&B Workout", owner: "Amazon Music", country: "ES", currentPosition: "5 / 37", daysOn: 11 },
  ]
};

export const tylaRadio = {
  "TOP 40": {
    dates: ["02/17","02/18","02/19","02/20","02/21","02/22","02/23"],
    daily: [416,395,405,450,415,565,418],
    weeklyTP: 983,
    plusMinus: 85,
    prevWeek: 898,
    dayparts: { OVN: 387, AMD: 125, MID: 92, PMD: 84, EVE: 295 },
    historicalTotal: 15658
  },
  "URBAN": {
    dates: ["02/17","02/18","02/19","02/20","02/21","02/22","02/23"],
    daily: [333,341,329,324,378,325,353],
    weeklyTP: 678,
    plusMinus: 44,
    prevWeek: 634,
    dayparts: { OVN: 242, AMD: 53, MID: 122, PMD: 113, EVE: 148 },
    historicalTotal: 10570
  },
  "RHYTHMIC": {
    dates: ["02/17","02/18","02/19","02/20","02/21","02/22","02/23"],
    daily: [745,825,816,813,835,824,846],
    weeklyTP: 1670,
    plusMinus: 240,
    prevWeek: 1430,
    dayparts: { OVN: 499, AMD: 220, MID: 364, PMD: 283, EVE: 304 },
    historicalTotal: 26673
  }
};

export const tylaRadioCharts = {
  top40: { rank: 22, lastWeek: 21, peak: 21, weeksOn: 6, spinsTW: 3034, spinsLW: 2895, change: 139 },
  urban: { rank: 18, lastWeek: 18, peak: 18, weeksOn: 6, spinsTW: 2335, spinsLW: 2010, change: 325 },
  rhythmic: { rank: 2, lastWeek: 5, peak: 2, weeksOn: 10, spinsTW: 5481, spinsLW: 4570, change: 911 },
  hotAC: { rank: 20, lastWeek: 21, peak: 20, title: "Water", weeksOn: 13, spinsTW: 1124, spinsLW: 1087, change: 37 },
};

export const tylaRadioBuilding = {
  top40: { rankTW: 22, rankLW: 22, weeksOn: 6, spinsTW: 1004, spinsLW: 916, change: 88 },
  urban: { rankTW: 17, rankLW: 17, weeksOn: 6, spinsTW: 679, spinsLW: 630, change: 49 },
  rhythmic: { rankTW: 2, rankLW: 3, weeksOn: 10, spinsTW: 1678, spinsLW: 1429, change: 249 },
  hotAC: { rankTW: 21, rankLW: 21, weeksOn: 14, spinsTW: 212, spinsLW: 194, change: 18 },
};
