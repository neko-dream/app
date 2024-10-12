<h1 align="center">猫の夢のフロント</h1>

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

## Development

Run the dev server:

```sh
pnpm run dev
```

To run Wrangler:

```sh
pnpm run build
pnpm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
bun typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
bun run build
```

Then, deploy your app to Cloudflare Pages:

```sh
bun run deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
