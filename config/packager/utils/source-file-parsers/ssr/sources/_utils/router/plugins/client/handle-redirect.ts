import { Router, State, Plugin } from 'router5';

export const handleRedirect = (router: Router): Plugin => ({
  onTransitionError: (toState: State, fromState: State, error: any): void => {
    if (error && error.actionResult && error.actionResult.redirect) {
      const { redirect } = error.actionResult;
      if (redirect.route && redirect.route.path) {
        router.navigate(redirect.route.path, redirect.route.params, {
          ...(redirect.route.options ? redirect.route.options : {}),
        });
      } else if (redirect.url) {
        window.location.href = redirect.url;
      }
    }
  },
});
