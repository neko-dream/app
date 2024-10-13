export const notfound = () => {
  throw new Response("Not Found", { status: 404 });
};
