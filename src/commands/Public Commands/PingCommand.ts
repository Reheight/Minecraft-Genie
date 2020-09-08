import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../config";
import { BuildEmbed } from "../../utils/EmbedUtil";

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping", "connection", "ms", "tps"],
            category: "Public Commands",
            description: {
                content: "Check the latence of the ping to the Discord API",
                usage: `${prefix}ping`,
                examples: [
                    `${prefix}ping`
                ]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message): Promise<any> {
        if (message.channel.type == "dm") return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
            msg.delete({ timeout: 30000 })
        })
        
        return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", "*The following latency is my latency between my host and the Discord API!*", [
            { name: "Latency", value: `${this.client.ws.ping}ms` }
        ])).then(msg => {
            msg.delete({ timeout: 60000 })
        })
    }
}
