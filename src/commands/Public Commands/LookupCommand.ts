import { Command } from "discord-akairo";
import { prefix } from "../../config";
import { Message } from "discord.js";
import { BuildEmbed } from "../../utils/EmbedUtil";
import Minecraft from "minecraft-player";

export default class LookupCommand extends Command {
    public constructor() {
        super("lookup", {
            aliases: ["lookup", "who", "whois", "search", "find", "get"],
            category: "Public Commands",
            description: {
                content: "Find out the UUID/Username of a player.",
                usage: `${prefix}lookup [username/uuid]`,
                examples: [
                    `${prefix}lookup Reheight`,
                    `${prefix}lookup d4be07ab-fc80-46ca-8706-70947a8e9beb`
                ]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message, { identifier }: { identifier: string }): Promise<any> {
        if (message.channel.type == "dm") return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
            msg.delete({ timeout: 30000 })
        })
        
        let args: string[] = message.toString().split(" ").filter((value: string, index: number) => index !== 0);

        if (args.length < 1) {
            return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", "*You must provide a Username or UUID!*", [
                { name: `Usage`, value: `${this.description["usage"]}` },
                { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
            ])).then(msg => {
                msg.delete({ timeout: 60000 })
            });
        }

        if (args.length > 1) {
            return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", "*You must provide only one argument!*", [
                { name: `Usage`, value: `${this.description["usage"]}` },
                { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
            ])).then(msg => {
                msg.delete({ timeout: 60000 })
            });
        }
        
        const minecraftResponse: any = await Minecraft(args[0]).catch(async (error) => {
            return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", `*You must provide a valid identifier!*\n**INVALID IDENTIFIER:** \`${args[0]}\``, [
                { name: `Usage`, value: `${this.description["usage"]}` },
                { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
            ])).then(msg => {
                msg.delete({ timeout: 60000 })
            });
        })

        if (!minecraftResponse) return;

        return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*Information of: \`${minecraftResponse["username"]}\`!*`, [
            { name: `UUID`, value: minecraftResponse["uuid"], inline: true }
        ])).then(async (msg) => {
            await msg.delete({ timeout: 60000 });
        })
    }
}
