/**
 * エラーレスポンスを返す時の関数
 */
export const boundary = (statusText?: string, status?: number) => {
  throw new Response("Unauthorized", {
    status: status ? status : 400,
    statusText,
  });
};
