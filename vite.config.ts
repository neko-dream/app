import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import basicSsl from "@vitejs/plugin-basic-ssl";
import "dotenv/config";
import { defineConfig, loadEnv, UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode || "", process.cwd()) };

  if (!process.env.API_BASE_URL || !process.env.BASE_URL) {
    throw new Error("❌ 必要な環境変数が読み込めていません。");
  }

  return defineConfig({
    define: {
      BASE_URL: `${JSON.stringify(process.env.BASE_URL)}`,
      API_BASE_URL: `${JSON.stringify(process.env.API_BASE_URL)}`,
    },
    server: {
      proxy: {},
      host: "local.kotohiro.com",
      port: 3000,
    },
    plugins: [
      basicSsl({
        name: "test",
        domains: ["local.kotohiro.com"],
        certDir: "./certificates",
      }),
      remixCloudflareDevProxy(),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),
      tsconfigPaths(),
    ],
  });
};
