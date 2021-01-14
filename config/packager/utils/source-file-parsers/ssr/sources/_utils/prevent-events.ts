import { SyntheticEvent } from 'react';

export const preventEvent = (event: SyntheticEvent<any>) =>
  event.preventDefault();
