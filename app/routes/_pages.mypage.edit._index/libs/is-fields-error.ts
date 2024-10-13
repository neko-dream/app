/**
 * conform で使用してるフィールドにエラーがあるかどうかを判定する型ガード
 */
export const isFieldsError = (error?: unknown): error is string[] => {
  if (!Array.isArray(error)) {
    return false;
  }
  return error.every((e) => typeof e === "string");
};
