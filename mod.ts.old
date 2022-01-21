import { Bot } from './deps.ts';
import init, { fib, prime_factorization } from "./pkg/rust_calculate_bot.js";

// if (Deno.env.get("ENVIRONMENT") === "production") {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/taroosg/rust-calculate-bot/main/pkg/rust_calculate_bot_bg.wasm"
//   );
//   await init(await res.arrayBuffer());
// } else {
//   await init(Deno.readFile("./pkg/rust_calculate_bot_bg.wasm"));
// }

await init(Deno.readFile("./pkg/rust_calculate_bot_bg.wasm"));

// 数値かどうかをチェックする関数
const isNumber = (str:string):boolean => (new RegExp(/^[0-9]+$/)).test(str);

// レスポンスを作成する関数
const createResponse = (str: string | undefined ): string =>
  !str
    ? 'NaN'
    : !isNumber(str)
      ? 'NaN'
      : !(Number(str) > 0)
        ? '0'
        : prime_factorization(Number(str)).join('\n');

const token = Deno.env.get("BOT_TOKEN") as string;

const bot = new Bot(token);

bot.on('text', async (ctx) => {
  await ctx.reply(createResponse(ctx.message?.text));
})

bot.launch();

