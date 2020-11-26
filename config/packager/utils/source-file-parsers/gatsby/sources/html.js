/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import favicon from './static/favicon.ico';
import latoRegularWoff2 from './static/fonts/latoregular.woff2';
import latoBoldWoff2 from './static/fonts/latobold.woff2';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} lang="ru">
      <head>
        <meta charSet="utf-8" />
        <title>React Boilerplate</title>
        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          name="viewport"
        />
        <meta content="Wildberries" name="description" />
        <link href={favicon} rel="shortcut icon" type="image/png" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={latoRegularWoff2}
          rel="preload"
          type="font/woff2"
        />
        <script src="/login/static/runtime-config.js" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={latoBoldWoff2}
          rel="preload"
          type="font/woff2"
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
