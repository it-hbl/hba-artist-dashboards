export const cortisPlaylists = {
  spotify: [
    { playlist: "Hot Hits Korea", owner: "Spotify", peakPosition: 6, currentPosition: "16 / 50", daysOn: 160 },
    { playlist: "Lagi Viral Highlights 2025", owner: "Spotify", peakPosition: 59, currentPosition: "59 / 75", daysOn: 77 },
    { playlist: "BIASBOYS", owner: "Spotify", peakPosition: 8, currentPosition: "11 / 50", daysOn: 162 },
    { playlist: "Pop Music Video Hits", owner: "Spotify", peakPosition: 26, currentPosition: "37 / 44", daysOn: 48 },
    { playlist: "Gerak Bebas", owner: "Spotify", peakPosition: 11, currentPosition: "29 / 81", daysOn: 142 },
    { playlist: "*hits different*", owner: "Spotify", peakPosition: 6, currentPosition: "17 / 80", daysOn: 147 },
    { playlist: "K-Pop Today (Philippines)", owner: "Spotify", peakPosition: 23, currentPosition: "46 / 50", daysOn: 2 },
    { playlist: "Boy in the Moon", owner: "Spotify", peakPosition: 5, currentPosition: "20 / 80", daysOn: 145 },
    { playlist: "Academic Comeback", owner: "Spotify", peakPosition: 18, currentPosition: "35 / 100", daysOn: 148 },
    { playlist: "K-Pop ON! (온)", owner: "Spotify", peakPosition: 6, currentPosition: "18 / 50", daysOn: 150 },
  ],
  appleMusic: [
    { playlist: "2026년 설날: 아일릿", curator: "Apple Music K-Pop", country: "KR", currentPosition: "11 / 21", daysOn: 8 },
    { playlist: "LNY All-Nighter", curator: "Apple Music", country: "TW", currentPosition: "4 / 91", daysOn: 13 },
    { playlist: "Phùng Khánh Linh: Celebrate Tet 2026", curator: "Apple Music Vietnam", country: "VN", currentPosition: "11 / 40", daysOn: 13 },
    { playlist: "Seollal 2026: CORTIS", curator: "Apple Music K-Pop", country: "BG", currentPosition: "1 / 25", daysOn: 19 },
    { playlist: "Shazam Fast Forward 2026", curator: "Shazam", country: "US", currentPosition: "1 / 65", daysOn: 35 },
    { playlist: "Viral Pop", curator: "Apple Music", country: "US", currentPosition: "19 / 55", daysOn: 38 },
    { playlist: "K-Pop Hits: 2025", curator: "Apple Music K-Pop", country: "US", currentPosition: "18 / 50", daysOn: 49 },
    { playlist: "Best Songs of 2025", curator: "Apple Music", country: "US", currentPosition: "70 / 100", daysOn: 90 },
    { playlist: "Sing: Viral", curator: "Apple Music", country: "US", currentPosition: "66 / 100", daysOn: 129 },
    { playlist: "Viral Hits", curator: "Apple Music", country: "IL", currentPosition: "22 / 50", daysOn: 135 },
    { playlist: "Family Hits", curator: "Apple Music: familia", country: "CN", currentPosition: "25 / 50", daysOn: 25 },
  ],
  amazon: []
};

export const cortisRadio = {
  "TOP 40": {
    dates: ["02/17","02/18","02/19","02/20","02/21","02/22","02/23"],
    daily: [50,88,121,129,103,163,109],
    weeklyTP: 272,
    plusMinus: 117,
    prevWeek: 155,
    dayparts: { OVN: 145, AMD: 6, MID: 6, PMD: 16, EVE: 99 },
    historicalTotal: 3407
  }
};

export const cortisRadioChart = {
  top40: {
    rank: 75,
    lastWeek: 69,
    peak: 56,
    title: "FaSHioN",
    weeksOn: 0,
    spinsTW: 56,
    spinsLW: 61,
    change: -5,
  },
  top40Building: {
    rankTW: 64,
    rankLW: 56,
    title: "FaSHioN",
    label: "BIGHIT/IMPERIAL/Republic",
    weeksOn: 0,
    spinsTW: 60,
    spinsLW: 56,
    change: 4,
  }
};

export const cortisRadioStations = [
  { station: "Music Choice - POP", weeklyTP: 10, plusMinus: 3 },
  { station: "WZYP-FM - Huntsville", weeklyTP: 7, plusMinus: -1 },
  { station: "WXLK-FM - Roanoke, VA", weeklyTP: 7, plusMinus: 7 },
  { station: "WKGS-FM - Rochester, NY", weeklyTP: 6, plusMinus: 4 },
  { station: "WMKS-FM - Greensboro, NC", weeklyTP: 6, plusMinus: 4 },
  { station: "KISO-FM - Omaha", weeklyTP: 6, plusMinus: 4 },
  { station: "WKKF-FM - Albany, NY", weeklyTP: 6, plusMinus: 4 },
  { station: "WWHT-FM - Syracuse", weeklyTP: 6, plusMinus: 4 },
  { station: "KZCH-FM - Wichita, KS", weeklyTP: 6, plusMinus: 6 },
  { station: "WHTF-FM - Tallahassee, FL", weeklyTP: 6, plusMinus: 4 },
  { station: "KHOP-FM - Modesto, CA", weeklyTP: 6, plusMinus: 6 },
  { station: "WVYB-FM - Daytona Beach, FL", weeklyTP: 6, plusMinus: 6 },
  { station: "WSPK-FM - Hudson Valley, NY", weeklyTP: 5, plusMinus: -1 },
  { station: "KCRZ-FM - Visalia-Tulare, CA", weeklyTP: 5, plusMinus: -2 },
  { station: "KUDL-FM - Sacramento", weeklyTP: 5, plusMinus: 1 },
  { station: "KTBT-FM - Tulsa", weeklyTP: 5, plusMinus: 3 },
  { station: "WXXX-FM - Burlington, VT", weeklyTP: 5, plusMinus: 0 },
  { station: "WNRW-FM - Louisville", weeklyTP: 5, plusMinus: 3 },
  { station: "WBLI-FM - Nassau-Suffolk", weeklyTP: 4, plusMinus: 1 },
  { station: "KIIS-FM - Los Angeles", weeklyTP: 4, plusMinus: -1 },
  { station: "KJYO-FM - Oklahoma City", weeklyTP: 4, plusMinus: 0 },
];
