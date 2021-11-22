const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const cron = require("cron");

const apiId = 8890619;
const apiHash = "1927a8fccb9773024b1b9707fd38c855";
const stringSession = new StringSession(""); // fill this later with the value from session.save()
(async () => {
  console.log("Sebentar...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("no hp ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("kode ?"),
    onError: (err) => console.log(err),
  });
  console.log("Sekarang harusnya sudah terkoneksi!");
  console.log("===================================");
  console.log("Copy paste token dibawah ke config.json");
  console.log("===================================");
  console.log(client.session.save()); // Save this string to avoid logging in again
  console.log("===================================");
})();
