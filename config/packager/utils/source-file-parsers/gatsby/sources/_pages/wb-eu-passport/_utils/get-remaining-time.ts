import { QUANTITY_SECONDS_IN_MINUTES } from '@/_pages/wb-eu-passport/_constants';
import { reformatTime } from '@/_pages/wb-eu-passport/_utils/reformat-time';

type ReturnType = {
  seconds: string;
  minutes: string;
};

export const getRemainingTime = (timeRemaining: number): ReturnType => {
  const remainingMinutes = Math.floor(
    timeRemaining / QUANTITY_SECONDS_IN_MINUTES,
  );
  const remainingSeconds =
    timeRemaining - remainingMinutes * QUANTITY_SECONDS_IN_MINUTES;
  const minutes = reformatTime(remainingMinutes);
  const seconds = reformatTime(remainingSeconds);

  return { minutes, seconds };
};
