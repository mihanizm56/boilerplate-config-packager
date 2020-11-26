// from backend is in millisaconds - be careful!
export const formatBackendTime = (time: number): number =>
  parseInt(`${time / 1000}`, 10);

export const getSeconds = (str: string) => {
  let seconds = 0;
  const months = str.match(/(\d+)\s*M/);
  const days = str.match(/(\d+)\s*D/);
  const hours = str.match(/(\d+)\s*h/);
  const minutes = str.match(/(\d+)\s*m/);
  const secs = str.match(/(\d+)\s*s/);
  if (months) {
    seconds += parseInt(months[1], 10) * 86400 * 30;
  }
  if (days) {
    seconds += parseInt(days[1], 10) * 86400;
  }
  if (hours) {
    seconds += parseInt(hours[1], 10) * 3600;
  }
  if (minutes) {
    seconds += parseInt(minutes[1], 10) * 60;
  }
  if (secs) {
    seconds += parseInt(secs[1], 10);
  }

  return seconds;
};
