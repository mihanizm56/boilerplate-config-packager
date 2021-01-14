import { Router, Middleware, State } from 'router5';
import promiseSequential from 'promise-sequential';
import {
  getActivatedRoutes,
  IAction,
  IActionParams,
  IActionResult,
  IAdvancedRoute,
} from '@wildberries/service-router';

const prepareError = (error: { status: number }): { status: number } => ({
  ...error,
  status: error.status || 500,
});

export const actionHandler = (router: Router): Middleware => async (
  toState: State,
  fromState: State,
): Promise<any> => {
  const { routes, store, cookies } = router.getDependencies();

  const actionParams: IActionParams = {
    router,
    toState,
    fromState,
    store,
    cookies,
  };

  let parentError = null;

  const getHandler = (route: IAdvancedRoute): (() => Promise<any>) => {
    return (): Promise<any> => {
      return new Promise((resolve, reject) => {
        if (
          route.actionResult &&
          route.actionResult.useCache === true &&
          !parentError &&
          !route.actionResult.error &&
          !route.actionResult.redirect
        ) {
          // Включен кеш для роута
          resolve(route);
        } else if (parentError) {
          // Родительский экшен роута завершился с ошибкой
          resolve(Object.assign(route, { actionResult: parentError }));
        } else if (
          typeof route.loadAction === 'function' ||
          typeof route.action === 'function'
        ) {
          // Промис экшена роута
          let actionPromise: Promise<IAction>;
          if (typeof route.loadAction === 'function') {
            actionPromise = new Promise((resolveActionLoad) => {
              route
                // TODO
                // eslint-disable-next-line
                // @ts-ignore
                .loadAction(store)
                .catch((err) => {
                  // Если не удалось загрузить чанк переходим на url напрямую
                  // Кейс возможен при выкатке новой версии когда имена чанков меняются
                  if (__CLIENT__) {
                    // Создаем промис который не резолвится для избежания вывода ошибки перехода
                    resolve(new Promise(() => {})); // eslint-disable-line

                    // Перезапрашиваем страницу по новому url с сервера
                    window.location.href = toState.path;
                  } else {
                    // На сервере корректно обрабатываем ошибку
                    reject(err);
                  }
                })
                .then((loaded: { default: IAction }) => {
                  resolveActionLoad(loaded.default);
                })
                .catch(reject);
            });
          } else {
            actionPromise = Promise.resolve(route.action);
          }
          // Run action promise
          actionPromise.then((action: IAction) => {
            action(actionParams)
              .then(
                (result: IActionResult): IAdvancedRoute => {
                  if (result.error) {
                    // TODO
                    // eslint-disable-next-line
                    // @ts-ignore
                    parentError = prepareError(result.error);

                    return Object.assign(route, {
                      // TODO
                      // eslint-disable-next-line
                      // @ts-ignore
                      actionResult: prepareError(result.error),
                    });
                  }

                  return Object.assign(route, { actionResult: result });
                },
              )
              .then((result: IAdvancedRoute) => {
                if (result.actionResult.redirect) {
                  reject(result);
                }
                resolve(result);
              })
              .catch(reject);
          });
        } else {
          resolve(Object.assign(route, { actionResult: null }));
        }
      });
    };
  };

  const activatedRoutes = getActivatedRoutes(toState, fromState, routes);

  interface IPromisesStack {
    result: { (): Promise<any> }[];
    parallelStack: { (): Promise<any> }[];
  }

  const { result } = activatedRoutes.reduce(
    (
      acc: IPromisesStack,
      route: IAdvancedRoute,
      index: number,
      arr: IAdvancedRoute[],
    ): IPromisesStack => {
      const newAcc = {
        result: [...acc.result],
        parallelStack: [...acc.parallelStack],
      };

      if (route.canParallel) {
        newAcc.parallelStack.push(getHandler(route));

        if (index === arr.length - 1) {
          const copiedParallelPromises = [...newAcc.parallelStack];
          newAcc.result.push(
            (): Promise<any> =>
              Promise.all(
                copiedParallelPromises.map(
                  (createPromise): Promise<any> => createPromise(),
                ),
              ),
          );
          newAcc.parallelStack = [];
        }
      } else {
        if (newAcc.parallelStack.length > 0) {
          const copiedParallelPromises = [...newAcc.parallelStack];
          newAcc.result.push(
            (): Promise<any> =>
              Promise.all(
                copiedParallelPromises.map(
                  (createPromise): Promise<any> => createPromise(),
                ),
              ),
          );
          newAcc.parallelStack = [];
        }

        newAcc.result.push(getHandler(route));
      }

      return newAcc;
    },
    {
      result: [],
      parallelStack: [],
    },
  );

  return promiseSequential(result);
};
