// import 'core-js';
// import 'regenerator-runtime/runtime';
import deepForceUpdate from 'react-deep-force-update';
import React from 'react';
import ReactDOM, { hydrate, render } from 'react-dom';
import { ABORT_REQUEST_EVENT_NAME } from '@mihanizm56/fetch-api';
import { createAppStore } from '@wildberries/redux-core-modules';
import i18next from 'i18next';
import { i18nextRequest } from '@wildberries/i18next-utils';
import { configureRouter } from '@wildberries/service-router';
import { GlobalStateType } from '@/_types';
import { configureCookies } from '@/_utils/cookies';
import { Page as ErrorPage } from '@/pages/error/page';
import { App } from '@/_components/app';
import {
  getLocaleFromCookies,
  getI18nextRequestEndpoint,
} from '@/_utils/i18next';
import { handleRedirect } from '@/_utils/router/plugins/client/handle-redirect';
import { setMeta } from '@/_utils/router/plugins/client/set-meta';
import { actionHandler } from '@/_utils/router/middlewares/action-handler';
import routes from '@/pages/routes';
import { i18nextLoader } from '@/_utils/router/middlewares/i18next-loader';
import { configureI18Next } from './_utils/configure-i18next';

const customWindow = window as IWindow;

// DOM элемент приложения
const container = document.getElementById('app');

// Применение переводов полученных на сервере
const { i18nData } = customWindow.ssrData;
const currentLocale = (i18nData && i18nData.locale) || 'ru'; // ru – default locale

// Конфигурирование i18next
configureI18Next({
  locale: currentLocale,
  translations: i18nData.translations,
});

// Конфигурирование cookies
const cookies = configureCookies();

// Применение стора вычесленного на сервере
const initialState: GlobalStateType =
  (customWindow.ssrData && customWindow.ssrData.reduxInitialState) || {};

const store = createAppStore({
  initialState,
  eventNameToCancelRequests: ABORT_REQUEST_EVENT_NAME,
  isSSR: true,
});

// Конфигурирование router
const router = configureRouter({
  setMetaPlugin: setMeta,
  customActionHandler: actionHandler,
  routes,
  defaultRoute: 'home',
  enablei18nMiddleware: true,
  customi18nPlugin: i18nextLoader,
});

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

// eslint-disable-next-line
// @ts-ignore
router.usePlugin(handleRedirect);

// Отключение браузерного восстановления скрола при переходах между страницами
/* eslint-disable no-restricted-globals */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
/* eslint-enable no-restricted-globals */

// Удаление ssrData из памяти
delete customWindow.ssrData;

// Экземпляр приложения
let appInstance;

const runApp = (renderer: ReactDOM.Renderer, callback?: () => void) => {
  try {
    router.start(() => {
      renderer(
        <App
          ref={(node) => {
            appInstance = node;
          }}
          cookies={cookies}
          router={router}
          store={store}
        />,
        container,
        () => {
          if (typeof callback === 'function') {
            callback();
          }
        },
      );
    });
    // });
  } catch (err) {
    renderer(
      <ErrorPage
        ref={(node) => {
          appInstance = node;
        }}
      />,
      container,
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    );
  }
};

runApp(hydrate);

// Автоматический перезапуск приложения
// В режиме Hot Module Replacement
if (module.hot) {
  module.hot.accept('@/pages/routes.ts', () => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    const setScrollPosition = () => {
      setTimeout(() => {
        // eslint-disable-next-line no-multi-assign
        document.documentElement.scrollTop = document.body.scrollTop = scrollPosition;
      }, 1);
    };

    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      runApp(render, () => {
        deepForceUpdate(appInstance);
        setScrollPosition();
      });
    } else {
      ReactDOM.unmountComponentAtNode(container);
      runApp(render, () => {
        setScrollPosition();
      });
    }
  });
}
