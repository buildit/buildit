export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomIntInclusive(values) {
  let [min, max] = values;
  max = Math.floor(max);
  return Math.random() * (max - min + 1) + min;
}

export function getDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}
