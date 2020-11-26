import 'reset-css';
import 'normalize.css';
import './src/styles/variables.module.scss';
import './src/styles/global.css';

import wrapWithProvider from './src';

export const wrapRootElement = wrapWithProvider;

// export const onServiceWorkerUpdateReady = () => window.location.reload();

// export const registerServiceWorker = () => true;
