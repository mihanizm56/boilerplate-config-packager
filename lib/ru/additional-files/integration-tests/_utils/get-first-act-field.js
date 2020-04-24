import { mockRevisesResponse } from '../mock-data/revises';

// ищем в первом акте значение по ключу
export const getFirstActField = keyName =>
  mockRevisesResponse.data.revises[0][keyName];
