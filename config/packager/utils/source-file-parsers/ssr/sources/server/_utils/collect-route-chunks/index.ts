type ParamsType = {
  chunks: Record<string, { js: Array<string>; css: Array<string> }>;
  routeChunks: Array<string>;
};

type OutputType = {
  styles: Array<string>;
  scripts: Array<string>;
};

export const collectRouteChunks = ({
  chunks,
  routeChunks,
}: ParamsType): OutputType =>
  routeChunks.reduce(
    (acc, chunkName) => {
      const chunksForRoute = chunks[chunkName];

      if (chunksForRoute) {
        if (chunksForRoute.js) {
          acc.scripts = [...acc.scripts, ...chunksForRoute.js];
        }

        if (chunksForRoute.css) {
          acc.styles = [...acc.styles, ...chunksForRoute.css];
        }
      }

      return acc;
    },
    {
      styles: chunks.client.css,
      scripts: chunks.client.js,
    },
  );
