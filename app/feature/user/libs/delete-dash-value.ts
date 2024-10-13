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
