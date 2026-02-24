export const ejJonesWeeklyData = [
  { weekEnding: '10/02/2025', total: 656957, audio: 430226, label: 'Sep 26' },
  { weekEnding: '10/09/2025', total: 922048, audio: 644280, label: 'Oct 3' },
  { weekEnding: '10/16/2025', total: 994632, audio: 704112, label: 'Oct 10' },
  { weekEnding: '10/23/2025', total: 655981, audio: 450756, label: 'Oct 17' },
  { weekEnding: '10/30/2025', total: 749253, audio: 546374, label: 'Oct 24' },
  { weekEnding: '11/06/2025', total: 834672, audio: 617048, label: 'Oct 31' },
  { weekEnding: '11/13/2025', total: 796137, audio: 592112, label: 'Nov 7' },
  { weekEnding: '11/20/2025', total: 666221, audio: 0, label: 'Nov 14' },
  { weekEnding: '11/27/2025', total: 735010, audio: 512170, label: 'Nov 21' },
  { weekEnding: '12/04/2025', total: 627942, audio: 447205, label: 'Nov 28' },
  { weekEnding: '01/08/2026', total: 713921, audio: 480583, label: 'Jan 2' },
  { weekEnding: '01/15/2026', total: 691855, audio: 460309, label: 'Jan 9' },
  { weekEnding: '01/22/2026', total: 641074, audio: 416752, label: 'Jan 16' },
  { weekEnding: '01/29/2026', total: 452025, audio: 352811, label: 'Jan 23' },
  { weekEnding: '02/05/2026', total: 1622887, audio: 1386300, label: 'Jan 30' },
  { weekEnding: '02/12/2026', total: 1232301, audio: 811008, label: 'Feb 6' },
  { weekEnding: '02/19/2026', total: 1369271, audio: 998399, label: 'Feb 13' },
];

export const ejJonesWoWData = [
  { week: 'Oct 3', wow: 40.35 },
  { week: 'Oct 10', wow: 7.87 },
  { week: 'Oct 17', wow: -34.05 },
  { week: 'Oct 24', wow: 14.22 },
  { week: 'Oct 31', wow: 11.40 },
  { week: 'Nov 7', wow: -4.62 },
  { week: 'Nov 21', wow: -14.57 },
  { week: 'Nov 28', wow: 11.24 },
  { week: 'Jan 2', wow: -3.09 },
  { week: 'Jan 9', wow: -7.34 },
  { week: 'Jan 16', wow: -29.49 },
  { week: 'Jan 23', wow: 352.12 },
  { week: 'Jan 30', wow: -24.07 },
  { week: 'Feb 6', wow: 11.11 },
  { week: 'Feb 13', wow: -18.83 },
];

export const ejJonesDailyData = [
  // Most recent week (Feb 13-19)
  { day: 'Fri 2/13', total: 245601, audio: 174702 },
  { day: 'Sat 2/14', total: 238273, audio: 160906 },
  { day: 'Sun 2/15', total: 176616, audio: 123048 },
  { day: 'Mon 2/16', total: 178694, audio: 134450 },
  { day: 'Tue 2/17', total: 174519, audio: 135197 },
  { day: 'Wed 2/18', total: 176926, audio: 134019 },
  { day: 'Thu 2/19', total: 178642, audio: 136077 },
];

export const ejJonesRadio = {
  "R&B": {
    dates: ["02/17","02/18","02/19","02/20","02/21","02/22","02/23"],
    daily: [3,5,5,5,21,10,3],
    weeklyTP: 13,
    plusMinus: -4,
    prevWeek: 17,
    dayparts: { OVN: 2, AMD: 0, MID: 2, PMD: 2, EVE: 7 },
    historicalTotal: 2482
  },
  "RHYTHMIC": {
    dates: ["02/17","02/18","02/19","02/20","02/21","02/22","02/23"],
    daily: [119,117,129,126,121,144,137],
    weeklyTP: 281,
    plusMinus: 55,
    prevWeek: 226,
    dayparts: { OVN: 122, AMD: 26, MID: 33, PMD: 30, EVE: 70 },
    historicalTotal: 2351
  }
};

export const ejJonesRadioChart = {
  rhythmic: {
    rank: 29,
    lastWeek: 39,
    peak: 29,
    weeksOn: 2,
    spinsTW: 833,
    spinsLW: 451,
    change: 382,
    dayparts: { OVN: 419, AMD: 46, MID: 98, PMD: 79, EVE: 191 }
  }
};

export const ejJonesRadioStations = {
  "R&B": [
    { station: "WTBV-FM - Tampa", weeklyTP: 2, plusMinus: 1 },
    { station: "WQQK-FM - Nashville", weeklyTP: 1, plusMinus: 0 },
    { station: "WJMR-FM - Milwaukee", weeklyTP: 1, plusMinus: 0 },
    { station: "WXST-FM - Charleston, SC", weeklyTP: 2, plusMinus: 0 },
    { station: "WHBX-FM - Tallahassee, FL", weeklyTP: 5, plusMinus: 0 },
    { station: "WWMG-FM - Montgomery, AL", weeklyTP: 1, plusMinus: 1 },
    { station: "KVMA-FM - Shreveport, LA", weeklyTP: 1, plusMinus: 1 },
  ],
  "RHYTHMIC": [
    { station: "WHZT-FM - Greenville, SC", weeklyTP: 13, plusMinus: 2 },
    { station: "KBLZ-FM - Tyler, TX", weeklyTP: 14, plusMinus: 1 },
    { station: "WKHT-FM - Knoxville", weeklyTP: 13, plusMinus: 2 },
    { station: "KXHT-FM - Memphis", weeklyTP: 11, plusMinus: 0 },
    { station: "WZMX-FM - Hartford", weeklyTP: 11, plusMinus: 4 },
    { station: "WJSR-FM - Richmond", weeklyTP: 11, plusMinus: 2 },
    { station: "WBHJ-FM - Birmingham", weeklyTP: 10, plusMinus: 1 },
    { station: "JQMF-FM - Madison, WI", weeklyTP: 10, plusMinus: 7 },
    { station: "KHTN-FM - Modesto, CA", weeklyTP: 9, plusMinus: 7 },
    { station: "KPHW-FM - Honolulu", weeklyTP: 8, plusMinus: -1 },
    { station: "KWIN-FM - Stockton, CA", weeklyTP: 8, plusMinus: 8 },
    { station: "KZFM-FM - Corpus Christi, TX", weeklyTP: 8, plusMinus: 1 },
    { station: "WMEZ-FM - Pensacola, FL", weeklyTP: 8, plusMinus: 8 },
    { station: "WYRB-FM - Rockford, IL", weeklyTP: 7, plusMinus: 1 },
    { station: "WTMG-FM - Gainesville, FL", weeklyTP: 15, plusMinus: 9 },
    { station: "KATJ-F2 - Victor Valley, CA", weeklyTP: 6, plusMinus: -1 },
    { station: "KSFM-FM - Sacramento", weeklyTP: 6, plusMinus: 1 },
  ]
};
