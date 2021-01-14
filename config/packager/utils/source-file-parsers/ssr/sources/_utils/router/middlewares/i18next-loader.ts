import {
  getActivatedRoutes,
  IAdvancedRoute,
} from '@wildberries/service-router';
import { Router, Middleware } from 'router5';

export const i18nextLoader = (router: Router): Middleware => async (
  toState,
  fromState,
) => {
  const { store, routes, i18nextConfig } = router.getDependencies();

  if (!i18nextConfig || !store) {
    return;
  }

  const {
    i18nextRequest,
    i18next,
    createEndpoint,
    actionToStartLoading,
    formatterResponseData,
    actionToStopLoading,
    getLocale,
  } = i18nextConfig;

  const locale = getLocale();

  const activatedRoutes = getActivatedRoutes(toState, fromState, routes);

  await Promise.all(
    activatedRoutes.map(async (routeData: IAdvancedRoute) => {
      const i18nextActionConfig = routeData.i18n;

      if (!i18nextActionConfig) {
        return;
      }

      const { namespaces } = i18nextActionConfig;

      // eslint-disable-next-line
      return await Promise.all(
        namespaces.map(async (namespace: string) => {
          const wasResourceDownloaded = Boolean(
            i18next.getResourceBundle(locale, namespace),
          );

          if (wasResourceDownloaded) {
            return;
          }

          if (actionToStartLoading) {
            store.dispatch(actionToStartLoading());

            // устанавливаем флаг что надо будет остановить лоудер после transitionSuccess (stopLoadingsPlugin)
            router.setDependency('stopLoadingActionsAfterNavigate', {
              i18n: actionToStopLoading,
            });
          }

          try {
            const { data, error, errorText } = await i18nextRequest({
              endpoint: createEndpoint({
                namespace,
                locale,
              }),
            });

            if (error) {
              throw new Error(errorText);
            }

            const formattedTranslateData = formatterResponseData
              ? formatterResponseData(data)
              : data;

            i18next.addResourceBundle(locale, namespace, {
              ...formattedTranslateData,
            });
          } catch (error) {
            console.error('get error when loading MODULE dict', error);
            console.error('namespace', namespace);
            console.error('locale', locale);
          }
        }),
      );
    }),
  );
};
