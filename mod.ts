import { Bot } from './deps.ts';
import init, { fib } from "./pkg/rust_calculate_bot.js";


await init(Deno.readFile("./pkg/rust_calculate_bot_bg.wasm"));

const token = Deno.env.get("BOT_TOKEN") as string;

console.log(token);

const bot = new Bot(token);

bot.on('text', async (ctx) => {
  const text = ctx.message?.text;
  if (text === '/hoge') {
    const res =  fib(Number(10)).toString() ;

    await ctx.reply(res);
  }
})

bot.launch();