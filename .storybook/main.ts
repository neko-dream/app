import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../app/**/*.mdx", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "vite.config.sb.ts",
      },
    },
  },
  // https://github.com/storybookjs/storybook/discussions/26038
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      server: {
        hmr: {
          clientPort: process.env.CODESPACES ? 443 : undefined,
        },
      },
    });
  },
};
export default config;