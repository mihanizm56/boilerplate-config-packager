/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import favicon from './static/favicon.ico';
import segoeuiBoldWoff2 from './static/fonts/segoeui-bold.woff2';
import segoeuiWoff2 from './static/fonts/segoeui.woff2';
import segoeuiBoldWoff from './static/fonts/segoeui-bold.woff';
import segoeuiWoff from './static/fonts/segoeui.woff';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta content="ie=edge" httpEquiv="x-ua-compatible" />
        <title>Паспорт</title>
        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          name="viewport"
        />
        <meta content="Wildberries" name="description" />
        <link href={favicon} rel="shortcut icon" type="image/png" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={segoeuiBoldWoff2}
          rel="preload"
          type="font/woff2"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          href={segoeuiWoff2}
          rel="preload"
          type="font/woff2"
        />
        <script src="/login/static/runtime-config.js" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={segoeuiWoff}
          rel="preload"
          type="font/woff"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          href={segoeuiBoldWoff}
          rel="preload"
          type="font/woff"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key="body"
          dangerouslySetInnerHTML={{ __html: props.body }}
          id="___gatsby"
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
