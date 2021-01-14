export const parseUrlParams = (): Record<string, string> => {
  const url = window.location.search;
  const query = url.substr(1);
  const result = {};

  query.split('&').forEach((part) => {
    const item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
};
