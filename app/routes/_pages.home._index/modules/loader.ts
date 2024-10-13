import { defer, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { api } from "~/libs/api";
import { httpCacheHeader } from "~/libs/api/cache-header";

const setQuery = (requestURL: string) => {
  try {
    const query = new URL(requestURL).searchParams.get("q");
    if (query === "open" || query === "finished") {
      return query;
    }
  } catch {}
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  const $session = api
    .GET("/talksessions", {
      headers: request.headers,
      params: {
        query: {
          status: setQuery(request.url),
        },
      },
    })
    .then((res) => res?.data);

  return defer({ $session }, { headers: httpCacheHeader() });
};
