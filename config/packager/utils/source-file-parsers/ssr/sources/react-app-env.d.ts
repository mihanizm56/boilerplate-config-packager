declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}

declare module '*.jpeg' {
  const url: string;
  export default url;
}

declare module '*.gif' {
  const url: string;
  export default url;
}

declare module '*.json' {
  const json: { [key: string]: any };
  export default json;
}

declare const __SERVER__: boolean; // eslint-disable-line no-underscore-dangle
declare const __CLIENT__: boolean; // eslint-disable-line no-underscore-dangle
declare const __DEV__: boolean; // eslint-disable-line no-underscore-dangle

// Переменные окружения доступные на сервере и на клиенте
declare const env: Record<string, string>;

interface IWindow extends Window {
  ssrData?: {
    reduxInitialState: IGlobalState;
    i18nData: {
      locale: string;
      translations: Record<string, string | Record<string, string>>;
    };
  };
}
