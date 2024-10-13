/**
 * TODO: キャッシュの時間とかを共通化したい
 */
export const httpCacheHeader = () => {
  const headers = new Headers();
  headers.append("Cache-Control", "max-age=900");
  return headers;
};
