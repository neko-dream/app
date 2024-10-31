import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import sharp from "sharp";
/**
 * ========= DANGER =========
 *  URLを確認するコードを入れる
 *
 * @QueryParams i: 画像のURL
 * @QueryParams width: 画像の幅
 * @QueryParams height: 画像の高さ
 *
 * ==========================
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { searchParams } = new URL(request.url);
    const i = searchParams.get("i") || "";
    const width = searchParams.get("width") || "";
    const height = searchParams.get("height") || "";

    const image = await fetch(i).then((res) => res.arrayBuffer());

    const roundedCorners = Buffer.from(`
       <svg>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${width}" ry="${height}"/>
       </svg>
       `);

    const resizedImage = await sharp(image)
      .png()
      .resize(Number(width), Number(height))
      .composite([
        {
          input: roundedCorners,
          blend: "dest-in",
        },
      ])
      .toBuffer();

    return new Response(resizedImage, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (e) {
    console.log(e);
    return new Response("Error", { status: 500 });
  }
};
