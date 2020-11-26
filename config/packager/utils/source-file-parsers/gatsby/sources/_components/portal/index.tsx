import React, { PureComponent, Props } from 'react';
import { uniqueId } from 'lodash-es';
import { createPortal } from 'react-dom';

const portalElement = document.getElementById('portal');

interface IProps extends Props<any> {
  children: React.ReactNode;
  prefix: string;
}

export class Portal extends PureComponent<IProps> {
  containerEl: HTMLElement;

  constructor(props: any) {
    super(props);

    this.containerEl = document.createElement('div');
    this.containerEl.id = `${props.prefix}_${uniqueId('portal_')}`;
    portalElement.appendChild(this.containerEl);
  }

  componentWillUnmount() {
    this.containerEl.remove();
  }

  render() {
    return createPortal(this.props.children, this.containerEl);
  }
}
