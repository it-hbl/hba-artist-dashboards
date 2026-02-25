export const DSP_COLORS: Record<string, string> = {
  "Spotify": "#1DB954",
  "Apple Music": "#FC3C44",
  "Pandora": "#005483",
  "TikTok": "#00F2EA",
  "Instagram": "#E1306C",
  "YouTube": "#FF0000",
  "Amazon Music": "#00A8E1",
};

export const dailyTrackerDates = ["02/16", "02/17", "02/18", "02/19", "02/20", "02/21", "02/22"];

export const dailyTrackerData = [
  { dsp: "Spotify", metric: "Streams", values: [1712713, 1647107, 1616016, 1559257, 1670865, 1764999, 1493203] },
  { dsp: "Apple Music", metric: "Streams", values: [283266, 286674, 289663, 290569, 302137, 310532, 268486] },
  { dsp: "Apple Music", metric: "Song Purchases", values: [82, 82, 81, 75, 101, 134, 97] },
  { dsp: "Apple Music", metric: "Shazams", values: [15301, 15045, 14276, 13954, 14851, 17365, 15402] },
  { dsp: "Pandora", metric: "Streams", values: [6265, 6494, 6326, 6548, 6978, 7250, null] },
  { dsp: "Pandora", metric: "Thumbs Up", values: [164, 162, 139, 165, 170, 172, null] },
  { dsp: "Amazon Music", metric: "Streams", values: [null, null, null, null, null, null, null] },
  { dsp: "TikTok", metric: "UGC Creates", values: [10311766, null, null, 10351902, null, null, 10403333] },
  { dsp: "Instagram", metric: "UGC Creates", values: [1742253, null, null, 1756227, null, null, 1771559] },
  { dsp: "YouTube", metric: "Official Music Video", values: [94057995, 94643290, 95157680, 95674947, null, null, 97280786] },
  { dsp: "YouTube", metric: "Official Lyric Video", values: [3352538, 3363290, 3373049, 3383274, null, null, 3415811] },
];

export const weeklyStreamsData = [
  { market: "Global", atd: 496474628, lp: 25557200, tp: 23833914, trend: -6.74 },
  { market: "Global - Audio Only", atd: 366972928, lp: 19026768, tp: 17933661, trend: -5.75 },
  { market: "Global - Video", atd: 129501700, lp: 6530432, tp: 5900253, trend: -9.65 },
  { market: "US", atd: 74442591, lp: 4118689, tp: 4025228, trend: -2.27 },
  { market: "US - Audio Only", atd: 64150579, lp: 3565981, tp: 3481639, trend: -2.37 },
  { market: "US - Video", atd: 10292012, lp: 552708, tp: 543589, trend: -1.65 },
];

export const socialFollowersData = [
  { platform: "Instagram", color: "#E1306C", lp: 13400000, tp: 13400000, trend: 0.00 },
  { platform: "TikTok", color: "#00F2EA", lp: 15900000, tp: 16000000, trend: 0.63 },
  { platform: "Facebook", color: "#1877F2", lp: 793000, tp: 796000, trend: 0.38 },
  { platform: "X", color: "#888888", lp: 451900, tp: 452100, trend: 0.04 },
  { platform: "Threads", color: "#FFFFFF", lp: 1100000, tp: 1200000, trend: 9.09 },
  { platform: "YouTube", color: "#FF0000", lp: 5670000, tp: 5690000, trend: 0.35 },
];

export const radioData = [
  { format: "Top 40", buildRankLW: 21, buildRankTW: 22, buildMove: 42, buildGainer: null, pubRankLW: 21, pubRankTW: 22, pubMove: 139, pubGainer: null },
  { format: "Urban", buildRankLW: 19, buildRankTW: 17, buildMove: 30, buildGainer: "#15", pubRankLW: 18, pubRankTW: 18, pubMove: 325, pubGainer: "#6" },
  { format: "Rhythm", buildRankLW: 3, buildRankTW: 2, buildMove: 120, buildGainer: "#2", pubRankLW: 5, pubRankTW: 2, pubMove: 911, pubGainer: "#3" },
  { format: "Audience", buildRankLW: 3.41, buildRankTW: 3.69, buildMove: 0.28, buildGainer: null, pubRankLW: 18.73, pubRankTW: 21.48, pubMove: 2.75, pubGainer: null },
];
