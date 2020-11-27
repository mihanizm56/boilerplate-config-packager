import { InMemoryCache, makeVar } from '@apollo/client';

const initialState = {
  todoModalOpened: false,
};

export const todoModalOpenedLocalStateVar = makeVar(
  initialState.todoModalOpened,
);

export const createInitialCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          todoModalOpened: {
            read: () => todoModalOpenedLocalStateVar(),
          },
        },
      },
    },
  });
