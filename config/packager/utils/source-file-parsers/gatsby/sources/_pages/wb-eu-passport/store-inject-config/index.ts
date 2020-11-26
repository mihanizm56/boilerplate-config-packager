import { StoreInjectConfig } from '@wildberries/redux-core-modules';
import reducerUI, {
  reducerUIName,
} from '@/_pages/wb-eu-passport/_redux/ui-module';
import loginAppStorage, {
  loginAppModuleReducerName,
} from '../_redux/login-app-module';
import loginFormStorage, {
  loginFormModuleReducerName,
  loginByPhoneWatcherSaga,
} from '../_redux/login-form-module';
import acceptCodeFormStorage, {
  acceptCodeFormModuleReducerName,
  acceptCodeWatcherSaga,
} from '../_redux/accept-code-form-module';

export const storeInjectConfig: StoreInjectConfig = {
  reducersToInject: [
    {
      name: loginAppModuleReducerName,
      reducer: loginAppStorage,
    },
    {
      name: reducerUIName,
      reducer: reducerUI,
    },
    {
      name: loginFormModuleReducerName,
      reducer: loginFormStorage,
    },
    {
      name: acceptCodeFormModuleReducerName,
      reducer: acceptCodeFormStorage,
    },
  ],
  sagasToInject: [
    {
      saga: loginByPhoneWatcherSaga,
      name: 'loginByPhoneWatcherSaga',
    },
    {
      saga: acceptCodeWatcherSaga,
      name: 'acceptCodeWatcherSaga',
    },
  ],
};
