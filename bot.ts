import { Bot } from "https://deno.land/x/grammy/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import init, { fib, prime_factorization } from "./pkg/rust_calculate_bot.js";

if (Deno.env.get("ENVIRONMENT") === "production") {
  const res = await fetch(
    "https://raw.githubusercontent.com/taroosg/rust-calculate-bot/main/pkg/rust_calculate_bot_bg.wasm"
  );
  await init(await res.arrayBuffer());
} else {
  await init(Deno.readFile("./pkg/rust_calculate_bot_bg.wasm"));
}

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

// コマンド
bot.command("cat", (ctx) => ctx.reply("Nya!"));

// テキスト
bot.on("message:text", async (ctx) => await ctx.reply(createResponse(ctx.message?.text), {
  reply_to_message_id: ctx.msg.message_id,
}));

// 画像
bot.on("message:photo", (ctx) => ctx.reply("Nice photo! Is that you?"));

// 修正
bot.on(
  "edited_message",
  (ctx) =>
    ctx.reply("Nya! You just edited this!", {
      reply_to_message_id: ctx.editedMessage.message_id,
    }),
);

bot.start();