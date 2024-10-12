import createClient from "openapi-fetch";
import type { paths } from "~/types/openapi";

export const api = createClient<paths>({ baseUrl: API_BASE_URL });
