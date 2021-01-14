import { Router, State, Plugin } from 'router5';
import i18next from 'i18next';
import { IRouterDependencies } from '@wildberries/service-router';
import { updateMeta, updateLink, updateCustomMeta } from '@/_utils/dom';

export const setMeta = (
  router: Router,
  { getRouteActionResult }: IRouterDependencies,
): Plugin => ({
  onTransitionSuccess: (toState: State): void => {
    const {
      title,
      ogImage,
      ogUrl,
      ogDescription,
      canonical,
      keywords,
      description,
    } = getRouteActionResult(toState.name);

    if (title) {
      document.title = i18next.t(title);
    }

    updateCustomMeta('og:image', ogImage);
    updateCustomMeta('og:url', ogUrl);
    updateCustomMeta('og:description', ogDescription);
    updateCustomMeta('og:title', title);

    updateLink('canonical', canonical);
    updateMeta('keywords', keywords);
    updateMeta('description', description);
  },
});
