import createClient from "openapi-fetch";
import { paths } from "./openapi";

/**
 * objectをFormDataに変換する
 */
const convertFormData = (params: object): FormData => {
  const formData = new FormData();

  for (const entries of Object.entries(params)) {
    const value =
      typeof entries[1] === "number" ? String(entries[1]) : entries[1];
    formData.append(entries[0], value);
  }

  return formData;
};

/**
 * APIクライアント
 */
export const api = createClient<paths>({
  baseUrl: API_BASE_URL,
  bodySerializer: (body) => body && convertFormData(body),
});
