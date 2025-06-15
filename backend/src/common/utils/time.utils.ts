function addDurationToDate(duration: string): Date {
  const now = new Date();

  const match = duration.match(/^(\d+)([smhdwMy])$/); // s=sec, m=min, h=hr, d=day, w=week, M=month, y=year
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const result = new Date(now);

  switch (unit) {
    case 's':
      result.setSeconds(result.getSeconds() + value);
      break;
    case 'm':
      result.setMinutes(result.getMinutes() + value);
      break;
    case 'h':
      result.setHours(result.getHours() + value);
      break;
    case 'd':
      result.setDate(result.getDate() + value);
      break;
    case 'w':
      result.setDate(result.getDate() + value * 7);
      break;
    case 'M':
      result.setMonth(result.getMonth() + value);
      break;
    case 'y':
      result.setFullYear(result.getFullYear() + value);
      break;
    default:
      throw new Error(`Unknown time unit: ${unit}`);
  }

  return result;
}
