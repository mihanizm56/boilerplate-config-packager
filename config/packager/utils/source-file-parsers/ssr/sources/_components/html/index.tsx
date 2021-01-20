import React from 'react';
import { serialize } from '@/_utils/serialize';

export type PropsType = React.Props<any> & {
  req?: any;
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  styles?: string[];
  scripts?: string[];
  ssrData?: Record<string, any>;
  children?: string;
  lang: string;
  clientEnvs: string;
};

export const Html = ({
  title,
  description,
  keywords,
  canonical,
  ogDescription,
  ogUrl,
  ogImage,
  styles,
  scripts,
  ssrData,
  children,
  lang = 'ru',
  clientEnvs,
}: PropsType) => (
  // eslint-disable-next-line jsx-a11y/lang
  <html lang={lang}>
    <head>
      <meta charSet="utf-8" />
      <meta content="ie=edge" httpEquiv="x-ua-compatible" />
      <meta
        content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0"
        name="viewport"
      />

      <title>{title}</title>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-display: swap;
              font-family: "lato";
              font-style: normal;
              font-weight: 700;
              src: url("/static/fonts/LatoRegular.woff2") format("woff2");
            }
            `,
        }}
      />

      <link
        as="font"
        crossOrigin="anonymous"
        href="/static/fonts/LatoRegular.woff2"
        rel="preload"
        type="font/woff2"
      />

      {description && <meta content={description} name="description" />}
      {keywords && <meta content={keywords} name="keywords" />}
      {canonical && <link href={canonical} rel="canonical" />}

      {/* Мета теги Open Graph */}
      <meta content={title} property="og:title" />
      {ogDescription && (
        <meta content={description} property="og:description" />
      )}
      {ogUrl && <meta content={ogUrl} property="og:url" />}
      {ogImage && <meta content={ogImage} property="og:image" />}

      {styles.map((style) => (
        <link key={style} as="style" href={style} rel="preload" />
      ))}
      {scripts.map((script) => (
        <link key={script} as="script" href={script} rel="preload" />
      ))}
      <link href="/static/favicon.ico" rel="shortcut icon" type="image/png" />

      {styles.map((style) => (
        <link key={style} rel="stylesheet" href={style} /> // eslint-disable-line
      ))}

      <script
        // env переменные доступные на клиенте
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.env = {
              ${clientEnvs}
            };
          `,
        }}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.ssrData = ${serialize(ssrData)};`,
        }}
      />
    </head>
    <body>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: children }}
        id="app"
      />
      {scripts.map((script) => (
        <script key={script} src={script} />
      ))}
    </body>
  </html>
);
