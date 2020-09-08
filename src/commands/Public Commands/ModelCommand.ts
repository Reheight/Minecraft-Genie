import { Command } from "discord-akairo";
import { prefix } from "../../config";
import { Message } from "discord.js";
import { BuildEmbed } from "../../utils/EmbedUtil";
import Minecraft from "minecraft-player";
import fs from "fs";
import request from 'request';

export default class ModelCommand extends Command {
    public constructor() {
        super("model", {
            aliases: ["model", "skin", "player", "render", "view"],
            category: "Public Commands",
            description: {
                content: "View the rendered skin of a registered Minecraft member.",
                usage: `${prefix}model [username/uuid]`,
                examples: [
                    `${prefix}model Reheight`,
                    `${prefix}model d4be07ab-fc80-46ca-8706-70947a8e9beb`
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
        
        return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*Stay patient while we retrieve the skin of: \`${minecraftResponse["username"]}\`!*`, [])).then(async (msg) => {
            var download = (uri: string, filename: string, callback: any) => {
                request.head(uri, (err: any) => {
                    if (err) return;
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                })
            }
    
            download(`https://visage.surgeplay.com/full/832/${minecraftResponse["uuid"]}`, `${__dirname}/../../skins/${minecraftResponse["uuid"]}.png`, async () => {
                let imageAttachment = `${__dirname}/../../skins/${minecraftResponse["uuid"]}.png`;
                await msg.delete();
                return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", `*You are viewing the skin of: \`${minecraftResponse["username"]}\`*`, [], [imageAttachment])).then(async msg => {
                    await msg.delete({ timeout: 60000 });
                })
            });
        })
    }
}
