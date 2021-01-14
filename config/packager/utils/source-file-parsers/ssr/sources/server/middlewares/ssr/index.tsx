import { Response, NextFunction, Request } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { cloneRouter, Router } from 'router5';
import { createAppStore } from '@wildberries/redux-core-modules';
import { geti18Next, i18nextRequest } from '@wildberries/i18next-utils';
import i18next from 'i18next';
import {
  configureRouter,
  IActionResult,
  IAdvancedRoute,
} from '@wildberries/service-router';
import {
  getI18nextRequestEndpoint,
  getLocaleFromCookies,
} from '@/_utils/i18next';
import { configureCookies } from '@/_utils/cookies';
import { Html, PropsType as IHtmlProps } from '@/_components/html';
import { App } from '@/_components/app';
// Файл chunk-manifest.json генерируется при сборке и позволяет мапить чанки для сервера и клиента по роутам
import { getChunks } from '@/_utils/router/_utils/get-chunks';
import { actionHandler } from '@/_utils/router/middlewares/action-handler';
import routes from '@/pages/routes';
import { i18nextLoader } from '@/_utils/router/middlewares/i18next-loader';
import { SSRReduxPrefetchMiddleware } from '@/_utils/router/middlewares/ssr-redux-prefetch-middleware';
import { getClientEnvs as getClientGLobalEnvs } from '@/server/_utils/collect-envs/get-client-envs';
import { collectRouteChunks } from '@/server/_utils/collect-route-chunks';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved

// Базовый объект роутера
const baseRouter: Router = configureRouter({
  customActionHandler: actionHandler,
  routes,
  defaultRoute: 'home',
  enablei18nMiddleware: true,
  customi18nPlugin: i18nextLoader,
});

baseRouter.setDependencies({
  getChunks: getChunks(baseRouter),
});

export const ssr = () => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Конфигрурирование cookies
    const cookies = configureCookies(req, res);
    const clientEnvs = getClientGLobalEnvs();

    const currentLocale = getLocaleFromCookies(cookies);

    // Конфигурирование redux
    const store = createAppStore({
      isSSR: true,
      manualSagaStart: true,
    });

    const sagaRunner = store.sagaMiddleware.run(store.rootSaga);

    // Клонирование базового роутера для обработки запроса
    const router = cloneRouter(baseRouter, baseRouter.getDependencies());
    router.setDependencies({
      store,
      cookies,
      i18nextConfig: {
        getLocale: getLocaleFromCookies.bind(null, cookies),
        i18next,
        i18nextRequest: (options) => i18nextRequest(options),
        createEndpoint: ({ locale, namespace }) =>
          getI18nextRequestEndpoint({ locale, namespace }),
        formatterResponseData: (data: { translate: Record<string, any> }) =>
          data.translate,
      },
    });
    router.useMiddleware(SSRReduxPrefetchMiddleware);

    // Конфигурирование i18next
    await geti18Next({ locale: currentLocale, debug: false });

    // Обработка пути с router5
    const route: IAdvancedRoute = await new Promise((resolve, reject) => {
      router.start(req.url, (error, state) => {
        if (error && error.actionResult && error.actionResult.redirect) {
          // Обработка редиректа
          const { redirect } = error.actionResult;
          let redirectUrl = redirect.url;

          if (redirect.route && redirect.route.name) {
            redirectUrl = router.buildPath(
              redirect.route.name,
              redirect.route.params || {},
            );
          }
          res.redirect(redirect.status || 302, redirectUrl);
        } else if (error) {
          reject(new Error(error.code));
        } else {
          resolve(state as IAdvancedRoute);
        }
      });
    });

    const routerDeps = router.getDependencies();

    // Результат выполнения экшена текущего роута
    const routeActionResult: IActionResult = routerDeps.getRouteActionResult(
      route.name,
    );

    // Определение чанков скриптов и стилей для текущего роута
    // (набивка чанков стилей и скриптов из манифеста chunk-manifest.json)
    const { scripts, styles } = collectRouteChunks({
      chunks,
      routeChunks: routerDeps.getChunks(route.name) || [],
    });

    try {
      // ожидание остановки работы саг
      sagaRunner.toPromise().then(() => {
        // данные для проброса на клиент
        const ssrData = {
          reduxInitialState: store.getState(),
          i18nData: {
            locale: currentLocale,
            translations: i18next.getDataByLanguage(currentLocale),
          },
        };

        // рендер самого приложения
        const renderedApp = ReactDOM.renderToString(
          <App cookies={cookies} router={router} store={store} />,
        );

        // Данные для отрисовки html страницы
        const data: IHtmlProps = {
          title: routeActionResult.title,
          description: routeActionResult.description,
          keywords: routeActionResult.keywords,
          canonical: routeActionResult.canonical,
          ogDescription: routeActionResult.ogDescription,
          ogUrl: routeActionResult.ogUrl,
          ogImage: routeActionResult.ogImage,
          styles,
          scripts,
          children: renderedApp,
          ssrData,
          lang: currentLocale,
          clientEnvs,
        };

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

        res.status(routeActionResult.status || 200);
        res.send(`<!doctype html>${html}`);
      });

      // останавливаем саги
      store.closeSagas();
    } catch (error) {
      next(error);
    }
  } catch (err) {
    next(err);
  }
};
