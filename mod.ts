import { Bot } from './deps.ts';
import init, { fib } from "./pkg/rust_calculate_bot.js";
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

if (Deno.env.get("ENVIRONMENT") === "production") {
  const res = await fetch(
    "https://raw.githubusercontent.com/taroosg/rust-calsulate-bot/main/pkg/rust_calculate_bot_bg.wasm"
  );
  await init(await res.arrayBuffer());
} else {
await init(Deno.readFile("./pkg/rust_calculate_bot_bg.wasm"));
}



const token = Deno.env.get("BOT_TOKEN") as string;

console.log(token);

const bot = new Bot(token);

bot.on('text', async (ctx) => {
  const text = ctx.message?.text;
  if (text === '/hoge') {
    console.log(text);
    const res =  fib(Number(10)).toString() ;

    await ctx.reply(res);
  }
})

bot.launch();

