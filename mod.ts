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

const token = Deno.env.get("BOT_TOKEN") as string;

console.log(token);

const bot = new Bot(token);

bot.on('text', async (ctx) => {
  const text = ctx.message?.text;
  const res = !text
    ? 'NaN'
    : !isNumber(text)
      ? 'NaN'
      : !(Number(text) > 0)
        ? '0'
        : prime_factorization(Number(text)).join('\n');
  await ctx.reply(res);
})

bot.launch();

