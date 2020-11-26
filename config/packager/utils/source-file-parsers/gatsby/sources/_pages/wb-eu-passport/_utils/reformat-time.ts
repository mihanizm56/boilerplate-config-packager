export const reformatTime = (time: number): string =>
  `${time < 10 ? '0' : ''}${time}`;
