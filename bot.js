const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7806839426:AAEH69KZV1wuVKsN92ApgbZ9J7NjZrAxAMQ";
const ADMIN_ID = 7046937898; 

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (chatId === ADMIN_ID) return;

  bot.forwardMessage(ADMIN_ID, chatId, msg.message_id);
  bot.sendMessage(ADMIN_ID, `💬 Dari ${msg.from.first_name} (ID: ${chatId})\nBalas dengan /reply ${chatId} pesanmu`);
});

bot.onText(/\/reply (\d+) (.+)/, (msg, match) => {
  if (msg.chat.id !== ADMIN_ID) return;
  const userId = match[1];
  const text = match[2];
  bot.sendMessage(userId, `📩 Admin: ${text}`);
  bot.sendMessage(ADMIN_ID, "✅ Terkirim ke user");
});