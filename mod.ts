import { Bot } from './deps.ts';
import init, { fib } from "./pkg/rust_calculate_bot.js";

// import * as pkg from './pkg/rust_calculate_bot.js'
// await pkg.default()

if (Deno.env.get("ENVIRONMENT") === "production") {
  const res = await fetch(
    "https://raw.githubusercontent.com/taroosg/rust-calculate-bot/main/pkg/rust_calculate_bot_bg.wasm"
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
try {
  bot.launch();
} catch (error) {
  console.log(error);
}

// import { serve } from "https://deno.land/std/http/server.ts";
// serve((req) => new Response("Hello world"));