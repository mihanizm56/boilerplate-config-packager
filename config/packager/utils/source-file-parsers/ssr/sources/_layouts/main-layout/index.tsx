import React, { PropsWithChildren } from 'react';
import { ConnectedLink } from 'react-router5';
import { Router } from 'router5';
import { routerPrefetcher } from '@/_utils/router-prefetcher';
import s from './index.scss';

type PropsType = PropsWithChildren<{ router: Router }>;

export const MainLayout = React.memo(({ children, router }: PropsType) => {
  return (
    <div className={s.root}>
      <nav>
        <ConnectedLink
          onMouseEnter={() => routerPrefetcher({ router, routeName: 'home' })}
          routeName="home"
        >
          Home
        </ConnectedLink>
        <br />
        <ConnectedLink
          onMouseEnter={() => routerPrefetcher({ router, routeName: 'page1' })}
          routeName="page1"
        >
          Page 1
        </ConnectedLink>
        <br />
        <ConnectedLink
          onMouseEnter={() => routerPrefetcher({ router, routeName: 'page2' })}
          routeName="page2"
        >
          Page 2
        </ConnectedLink>
        <br />
        <ConnectedLink
          onMouseEnter={() =>
            routerPrefetcher({ router, routeName: 'pokemon-page' })
          }
          routeName="pokemon-page"
        >
          Pokemon Page
        </ConnectedLink>
      </nav>
      <div className={s.content}>{children}</div>
    </div>
  );
});
