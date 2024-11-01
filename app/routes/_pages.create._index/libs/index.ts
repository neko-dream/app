import { normalize as normalizeAdress } from "@geolonia/normalize-japanese-addresses";
import { LatLng, PrefectureCity } from "../types";

export const reverse = async ({ lat, lng }: LatLng) => {
  try {
    const result = await fetch(
      `${FUNCTIONS_URL}/geolocation/?&lat=${lat}&lng=${lng}`,
    ).then(async (res) => (await res.json()) as PrefectureCity);

    return {
      prefecture: result.prefecture,
      city: result.city,
    };
  } catch {
    return {
      prefecture: "---",
      city: "---",
    };
  }
};

export const normalize = async ({ prefecture, city }: PrefectureCity) => {
  try {
    // 住所を正規化
    const normalized = await normalizeAdress(`${prefecture}${city}`);

    if (
      !normalized ||
      !normalized.point ||
      !normalized.point?.lat ||
      !normalized.point?.lng
    ) {
      return null;
    }

    return {
      lat: normalized.point?.lat,
      lng: normalized.point?.lng,
    };
  } catch {
    return null;
  }
};
