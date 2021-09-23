import 'dotenv/config';
import Discord, { TextChannel } from 'discord.js';
import fetch from 'node-fetch';
import { ethers } from "ethers";

const discordBot = new Discord.Client();
const  discordSetup = async (): Promise<TextChannel> => {
  return new Promise<TextChannel>((resolve, reject) => {
    ['DISCORD_BOT_TOKEN', 'DISCORD_CHANNEL_ID'].forEach((envVar) => {
      if (!process.env[envVar]) reject(`${envVar} not set`)
    })
  
    discordBot.login(process.env.DISCORD_BOT_TOKEN);
    discordBot.on('ready', async () => {
      const channel = await discordBot.channels.fetch(process.env.DISCORD_CHANNEL_ID!);
      resolve(channel as TextChannel);
    });
  })
}

const buildMessage = () => (
  new Discord.MessageEmbed()
	.setTitle('gm')
)

async function main() {
  const channel = await discordSetup();
  const message = buildMessage();
  return channel.send(message)
}

main()
  .then((res) =>{ 
    if (!res) console.log("gm failed")
    process.exit(0)
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });