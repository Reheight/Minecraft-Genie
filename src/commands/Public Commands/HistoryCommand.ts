import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../config";
import { BuildEmbed } from "../../utils/EmbedUtil";
import Minecraft from "minecraft-player";
var moment = require('moment');

interface usernameData {
    username: string,
    changedAt?: Date
}

export default class HistoryCommand extends Command {
    public constructor() {
        super("history", {
            aliases: ["history", "names", "name", "previousnames", "namelist", "username", "usernames", "alias", "past"],
            category: "Public Commands",
            description: {
                content: "Information about a users previous username(s)!",
                usage: `${prefix}history [username/uuid]`,
                examples: [
                    `${prefix}history Reheight`,
                    `${prefix}history d4be07ab-fc80-46ca-8706-70947a8e9beb`
                ]
            },
            ratelimit: 3
        });
    }
    

    public async exec(message: Message): Promise<any> {
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
        let usernameHistory = Array<usernameData>();

        minecraftResponse["usernameHistory"].forEach(element => {
            let userData: usernameData = { username: element["username"], changedAt: element["changedAt"] };
            usernameHistory.push(userData);
        });

        let paginatedOutput = [];

        for (var i = 0, len = usernameHistory.length; i < len; i += 5) {
            //console.log(`\n${usernameHistory.length}\n${paginatedOutput.length}\n`);
            paginatedOutput.push(usernameHistory.slice(i, i + 5));
        }

        let pages = paginatedOutput;
        let page  = 1;

        let pageEmbed = async (page: number) => {
            return await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are viewing the name history of: \`${minecraftResponse["username"]}\`!*`, [
                {
                    name: `History`,
                    value: `\`\`\`` +
                        `${pageResults(pages[page - 1])}` +
                        `\`\`\``
                },
                {
                    name: `Page`,
                    value: `${page}/${pages.length}`
                }
            ])
        }

        return await message.util.send(await pageEmbed(page)).then(async (msg) => {
            msg.react('◀').then(r => {
                msg.react('▶').then(r => {
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
    
                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
                    
                    backwards.on('collect', async r => {
                        if (page === 1)
                            return r.users.remove(message.author);
                        
                        page--;
    
                        await msg.edit(await pageEmbed(page));
                        return await r.users.remove(message.author);
                    })
    
                    forwards.on('collect', async r => {
                        if (page === pages.length)
                            return r.users.remove(message.author);
                        
                        page++;
    
                        await msg.edit(await pageEmbed(page));
                        return await r.users.remove(message.author);
                    })
                }).catch(() => {
                    msg.delete();
                })
            }).catch(() => {
                msg.delete();
            })
        }).catch(async (err) => {
            console.log(err);
            return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*There was an error while sending you the players history!*`, [])).then(async msg => {
                await msg.delete({ timeout: 60000 });
            })
        })
    }
}

const pageResults = (data: usernameData[]): string => {
    let response = "";

    data.forEach(user => {
        response += `${user.username} [${user.changedAt ? moment(user.changedAt).format("MM/DD/YYYY") : "Original"}]\n`
    })

    return response;
}
