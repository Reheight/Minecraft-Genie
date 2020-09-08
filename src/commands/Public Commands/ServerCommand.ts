import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../config";
import { BuildEmbed } from "../../utils/EmbedUtil";
import MCP from "minecraft-protocol";
import DNS from "dns";
import { MessageEmbed } from "discord.js";
import fs from "fs";
import axios from 'axios';

export default class InfoCommand extends Command {
    public constructor() {
        super("server", {
            aliases: ["server", "servers", "players", "ip", "servercount", "serv", "rcon"],
            category: "Public Commands",
            description: {
                content: "View server information with the bot, by supplying both a IP and port!",
                usage: `${prefix}server [ip/domain] -port=[port]`,
                examples: [
                    `${prefix}server hypixel.net -port=25565`,
                    `${prefix}server 172.65.212.227 -port=25565`
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "host",
                    type: (_: Message, str: string): null | string => {
                        if (str.toLowerCase() === "help") return "SHOW_INFORMATION_SECTION";

                        if (isIPv4(str)) return str;

                        if (isDomain(str)) return str;

                        return null;
                    },
                    match: "phrase",
                    default: "172.65.212.227"
                },
                {
                    id: "port",
                    type: (_: Message, str: string): null | Number => {
                        if (str && !isNaN(Number(str)) && isPort(Number(str))) return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["-port="],
                    default: 25565
                }
            ]
        });
    }

    public async exec(message: Message, { host, port }: { host: string, port: number }): Promise<any> {
        if (message.channel.type == "dm") return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
            msg.delete({ timeout: 30000 })
        })
        
        if (host === "SHOW_INFORMATION_SECTION") return await message.util.send(await BuildEmbed(this.client, "**Minecraft Genie**", "*You must provide a Username or UUID!*", [
            { name: `Usage`, value: `${this.description["usage"]}` },
            { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
        ])).then(msg => {
            msg.delete({ timeout: 60000 })
        });
        
        return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*Attempting to retrieving information...*`, [
            { name: `Host`, value: host, inline: true },
            { name: `Port`, value: port.toString(), inline: true }
        ])).then(async (msg) => {
            let serverInformation = await jsonRequest(`${host}:${port}`).catch(async (error) => {
                return await msg.edit(await BuildEmbed(this.client, `**Minecraft Genie**`, `*We had trouble retrieving information on: \`${host}:${port}\`*`, [])).then(async (msg) => {
                    msg.delete({ timeout: 30000 });
                })
            })

            if (!serverInformation["online"]) {
                return await msg.edit(await BuildEmbed(this.client, `**Minecraft Genie**`, `*We had trouble contacting host: \`${host}:${port}\` so we're going to check for other ports!*`, [])).then(async (msg) => {
                    let seekingPortInformation = await jsonRequest(`${host}`).catch(async (error) => {
                        return await msg.edit(await BuildEmbed(this.client, `**Minecraft Genie**`, `*We were unable to find any Minecraft Server ports for: \`${host}\`*`, [])).then(async (msg) => {
                            msg.delete({ timeout: 30000 });
                        })
                    })

                    if (!seekingPortInformation["online"]) {
                        return await msg.edit(await BuildEmbed(this.client, `**Minecraft Genie**`, `*We were unable to find any Minecraft Server ports for: \`${host}\`*`, [])).then(async (msg) => {
                            msg.delete({ timeout: 30000 });
                        })
                    } else {
                        return sendMessage(seekingPortInformation)
                    }
                })
            } else {
                return sendMessage(serverInformation);
            }

            async function sendMessage(result: object) {
                interface serverInformation {
                    host: string,
                    port: number,
                    players: {
                        max: number,
                        online: number
                    },
                    version: {
                        name: string,
                        protocol: number
                    },
                    online: boolean,
                    favicon: string,
                    hostname: string,
                    description: string[]
                }

                let serverStatus: serverInformation = {
                    host: result["ip"],
                    port: result["port"],
                    players: {
                        max: result["players"]["max"],
                        online: result["players"]["online"]
                    },
                    version: {
                        name: result["version"],
                        protocol: result["protocol"]
                    },
                    online: result["online"],
                    favicon: result["icon"],
                    hostname: result["hostname"],
                    description: result["motd"]["clean"]
                }

                var bitmap = Buffer.from(serverStatus.favicon.split('data:image/png;base64,').pop(), 'base64');

                fs.writeFileSync(`${__dirname}/../../favicons/${serverStatus.host}.png`, bitmap);

                let updatedEmbed: MessageEmbed = new MessageEmbed()
                .setTitle(`**Minecraft Genie**`)
                .setDescription(`*Successfully retrieved server information for: \`${serverStatus.host}:${serverStatus.port}\`*`)
                .attachFiles([`${__dirname}/../../favicons/${serverStatus.host}.png`])
                .setThumbnail(`attachment://${serverStatus.host}.png`)
                .setFooter('Reheight#4947')
                .setTimestamp()
                .addFields(
                    { name: "Player Count", value: `\`${serverStatus.players.online}/${serverStatus.players.max}\`` },
                    { name: "Description", value: `\`${serverStatus.description.join("\n")}\`` },
                    { name: "Version", value: `\`${serverStatus.version.name}\`` },
                    { name: "Version Protocol", value: `\`${serverStatus.version.protocol}\`` },
                    { name: "Address", value: `\`${serverStatus.host}\`` },
                    { name: "Hostname", value: `\`${serverStatus.hostname}\`` },
                    { name: "Port", value: `\`${serverStatus.port}\`` },
                    { name: "Status", value: `\`${serverStatus.online ? "Online" : "Offline"}\`` },
                )
                .setColor("#1ced9d")

                await msg.delete();

                return await message.util.send(updatedEmbed).then(async (msg) => {
                    await msg.delete({ timeout: 120000 });
                })
            }
        })
    }
}


const isIPv4 = (address: string): boolean => {
    let regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(address);
}

const isDomain = (address: string): boolean => {
    let regex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
    return regex.test(address);
}

const isPort = (port: number): boolean => {
    let regex = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
    return regex.test(port.toString());
}

const IPv4 = (address: string) => {
    return new Promise((resolve, reject) => {
        DNS.lookup(address, (err, result) => {
            console.log(address);
            if (err) reject(err);
            resolve(result);
        })
    })
}

var jsonRequest = (address): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.mcsrvstat.us/2/${address}`).then((response) => {
            resolve(response["data"]);
        }).catch((error) => {
            reject(error);
        })
    })
}