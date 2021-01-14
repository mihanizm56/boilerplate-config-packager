import React, { PureComponent } from 'react';
import { Page as ErrorPage } from '@/pages/error/page';

interface IState {
  error?: Error;
}

export class ErrorBoundary extends PureComponent<any, IState> {
  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error };
  }

  state = {
    error: null,
  };

  render() {
    return this.state.error ? <ErrorPage /> : this.props.children;
  }
}
