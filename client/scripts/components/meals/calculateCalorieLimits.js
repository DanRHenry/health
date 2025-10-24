export function calculateCalorieLimits() {
  const calorieLimits = {
  "6_2": {
    260: {
      maintain: 2554,
      losehalf: 2304,
      loseone: 2054,
      loseonepointfive: 1804,
      losetwo: 1554,
    },
    250: {
      maintain: 2494,
      losehalf: 2244,
      loseone: 1994,
      loseonepointfive: 1744,
      losetwo: 1494,
    },
    240: {
      maintain: 2440,
      losehalf: 2190,
      loseone: 1940,
      loseonepointfive: 1690,
      losetwo: 1440,
    },
    230: {
      maintain: 2386,
      losehalf: 2136,
      loseone: 1886,
      loseonepointfive: 1636,
      losetwo: 1386,
    },
    220: {
      maintain: 2331,
      losehalf: 2081,
      loseone: 1831,
      loseonepointfive: 1581,
      losetwo: 1331,
    },
    210: {
      maintain: 2277,
      losehalf: 2027,
      loseone: 1777,
      loseonepointfive: 1527,
      losetwo: 1277,
    },
    200: {
      maintain: 2222,
      losehalf: 1972,
      loseone: 1722,
      loseonepointfive: 1472,
      losetwo: 1222,
    },
    190: {
      maintain: 2168,
      losehalf: 1918,
      loseone: 1668,
      loseonepointfive: 1418,
      losetwo: 1168,
    },
    180: {
      maintain: 2113,
      losehalf: 1863,
      loseone: 1613,
      loseonepointfive: 1363,
      losetwo: 1113,
    },
  },
};

  const maintainCals = document.getElementById("maintainCals");
  const losePointFiveLbCals = document.getElementById("losePointFiveLbCals");
  const loseOneLbCals = document.getElementById("loseOneLbCals");
  const loseOnePointFiveLbsCals = document.getElementById(
    "loseOnePointFiveLbsCals"
  );

  const cals = Number(document.getElementById("dailyCalories").innerText);

  const height = "6_2";
  const weight = sessionStorage.weight;

  const calorieLimitsRange = calorieLimits[height][Math.floor(weight * 0.1) * 10]

      maintainCals.innerText = calorieLimitsRange.maintain - cals

      losePointFiveLbCals.innerText = calorieLimitsRange.losehalf -cals

      loseOneLbCals.innerText = calorieLimitsRange.loseone - cals

      loseOnePointFiveLbsCals.innerText = calorieLimitsRange.loseonepointfive - cals


}