import municipality from "~/assets/data/adress/municipality.json";

/**
 * "---" の値を持っているプロパティを削除する関数
 * select コンポーネントの使用上 "---" が初期値になってしまうため
 *
 * @memo APIでリクエストする前に使用して削除する
 */
export const deleteDashValues = (obj?: object) => {
  return Object.fromEntries(
    Object.entries(obj || {}).filter(([, v]) => v !== "---"),
  );
};

/**
 *
 * conform のフォームでボタンを押せるかどうかを判定する
 *
 * 1. "---"を削除した後Formに値があるかどうか
 * 2. フォームのエラー配列にエラーがあるかどうか
 * @param value Form の内容を object で受け取る
 * ```
 * {
 *   name: "name",
 *   age: "---",
 * }
 * ```
 */
export const handleDisabled = (value?: object, errors?: object) => {
  return (
    Object.keys(deleteDashValues(value)).length === 0 ||
    Object.keys(errors || {}).length !== 0
  );
};

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
