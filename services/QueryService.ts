import { ParsedUrlQueryInput } from "querystring";

export const routerQueryToString = (
  query: ParsedUrlQueryInput,
  removedParam?: string
): string => {
  if (removedParam) {
    Reflect.deleteProperty(query, removedParam);
  }

  const queryToString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");

  return queryToString;
};

export const addQueryParams = (
  query: ParsedUrlQueryInput,
  key: string,
  value: string
): string => {
  const queryString = routerQueryToString(query, "slug");

  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has(key)) {
    const previousParams = urlParams.get(key)?.split(",");
    const newParams = previousParams ? [...previousParams, value] : [value];
    urlParams.set(key, newParams.join(","));
  } else {
    urlParams.set(key, value);
  }

  return decodeURIComponent(urlParams.toString());
};

export const removeQueryParams = (
  query: ParsedUrlQueryInput,
  key: string,
  value: string
): string => {
  const queryToString = routerQueryToString(query, "slug");

  const urlParams = new URLSearchParams(queryToString);

  const paramsOfKey = urlParams.get(key);

  if (paramsOfKey && paramsOfKey?.split(",").length > 1) {
    const previousParams = paramsOfKey.split(",");
    const newParams = previousParams
      .filter((param) => param !== value)
      .join(",");
    urlParams.set(key, newParams);
  } else if (paramsOfKey) {
    urlParams.delete(key);
  }

  return decodeURIComponent(urlParams.toString());
};
