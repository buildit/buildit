export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomIntInclusive(values) {
  let [min, max] = values;
  max = Math.floor(max);
  return Math.random() * (max - min + 1) + min;
}
