export function calcPointsLimiter(width, height) {
  const pointsLimiterMin = 6;
  const pointsLimiter = (width * height) / 60000;

  return pointsLimiter > pointsLimiterMin ? pointsLimiter : pointsLimiterMin;
}