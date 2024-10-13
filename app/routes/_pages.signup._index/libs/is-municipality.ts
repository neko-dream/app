import municipality from "~/assets/data/adress/municipality.json";

/**
 * 存在する市町村かどうかを判定する型ガード
 */
export const isMunicipality = (
  value?: string,
): value is keyof typeof municipality => {
  if (!value) {
    return false;
  }
  return value in municipality;
};
