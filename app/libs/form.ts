import municipality from "~/assets/data/adress/municipality.json";

/**
 * 存在する市町村かどうかを判定する型ガード
 */
export const isCity = (value?: string): value is keyof typeof municipality => {
  if (!value) {
    return false;
  }
  return value in municipality;
};

/**
 * conform で使用してるフィールドにエラーがあるかどうかを判定する型ガード
 */
export const isFieldsError = (error?: unknown): error is string[] => {
  if (!Array.isArray(error)) {
    return false;
  }
  return error.every((e) => typeof e === "string");
};

/**
 * "---" の値を持っているプロパティを削除する関数
 * select コンポーネントの使用上 "---" が初期値になってしまうため
 *
 * @memo APIでリクエストする前に使用して削除する
 */
export const deleteDashValues = <T>(obj?: T): deleteDashValues<T> => {
  return Object.fromEntries(
    Object.entries(obj || {}).filter(([, v]) => v !== "---"),
  ) as deleteDashValues<T>;
};

// 値が"---"であるプロパティをneverに変換するユーティリティ型
export type deleteDashValues<T> = {
  [K in keyof T]: Exclude<T[K], "---">;
};
