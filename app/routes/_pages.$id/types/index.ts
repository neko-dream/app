import { components } from "~/libs/api/openapi";

export type SessionRouteContext = {
  session: components["schemas"]["talkSession"];
};
