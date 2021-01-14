import React from 'react';
import s from './index.scss';

// Компонент должен быть классом так как в client.tsx на него должна быть возможность получить ref

export class Page extends React.PureComponent<React.Props<any>> {
  render() {
    return <div className={s.root}>500 – Error</div>;
  }
}
