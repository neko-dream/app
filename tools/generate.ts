/**
 * openapi ファイルから api クライアントを生成するスクリプト
 */
import { $ } from "bun";

await $`npx openapi-typescript ./tools/polis.openapi.yaml -o ./app/types/openapi.ts`; // 1256
