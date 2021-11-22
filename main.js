const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fetch = require("node-fetch");
globalThis.fetch = fetch;
const cron = require("cron");

const shill = require("./words");
const token = require("config.json").TOKEN;

const apiId = 8890619;
const apiHash = "1927a8fccb9773024b1b9707fd38c855";
const stringSession = new StringSession(token);

const maxValue = shill.length;

(async () => {
	console.log("Loading interactive example...");
	const client = new TelegramClient(stringSession, apiId, apiHash, {
		connectionRetries: 5,
	});
	await client.start();
	console.log("You should now be connected.");

	// Cara baca crontab:
	// https://crontab.guru/
	const q0 = new cron.CronJob(
		"*/1 * * * *",
		async () => {
			try {
				let randomAdditional = Math.floor(Math.random() * 5000) + 1000;
				let randomPick = Math.floor(Math.random() * maxValue);

				setTimeout(() => {
					client.sendMessage("@therecharge_official", {
						message: shill[randomPick],
					});
				}, randomAdditional);
			} catch (e) {
				console.log(e.message);
			}
		},
		null,
		true,
		"Asia/Jakarta"
	);
})();
