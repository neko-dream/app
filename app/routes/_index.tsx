import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="inline-block h-screen items-center justify-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium leading-tight"></div>
  );
}
