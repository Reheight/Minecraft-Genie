import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../config";
import { BuildEmbed } from "../../utils/EmbedUtil";

export default class InfoCommand extends Command {
    public constructor() {
        super("info", {
            aliases: ["info", "author", "developer", "library", "creator", "api", "about"],
            category: "Public Commands",
            description: {
                content: "Information about the bot and the developer(s)!",
                usage: `${prefix}info`,
                examples: [
                    `${prefix}info`
                ]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message): Promise<any> {
        if (message.channel.type == "dm") return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
            msg.delete({ timeout: 30000 })
        })
        
        return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", "*View Minecraft player and server information with ease, we provide powerful tools for your favorite game in your favorite chatting service!*", [
            { name: "<:developer:749333179210661899> Developer", value: `Reheight#4947`, inline: true },
            { name: "<:version:749333179315519578> Version", value: `1.0.0`, inline: true },
            { name: "<:typescript:752593779554517042> Language", value: `JavaScript & TypeScript`, inline: true },
            { name: "<:discordjs:749333179109736488> Library", value: `Discord.JS`, inline: true },
            { name: "<:minecraft:744964913155276901> API", value: `Mojang API`, inline: true },
            { name: "🏠 Guilds", value: `${this.client.guilds.cache.size}`, inline: true },
            { name: "🙍‍♂️ Members", value: `${this.client.users.cache.size}`, inline: true }
        ])).then(msg => {
            msg.delete({ timeout: 60000 })
        })
    }
}
