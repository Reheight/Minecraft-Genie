import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../config";
import { BuildEmbed } from "../../utils/EmbedUtil";
import { partners } from "../../extra/partners";
import { MessageEmbed } from "discord.js";
import { Guild } from "discord.js";
import { Invite } from "discord.js";

export default class PingCommand extends Command {
    public constructor() {
        super("partners", {
            aliases: ["partners", "affiliates", "affiliate", "partner"],
            category: "Public Commands",
            description: {
                content: "Check out our offiliates who help us out so much!",
                usage: `${prefix}affiliates`,
                examples: [
                    `${prefix}affiliates`
                ]
            },
            ratelimit: 3
        });
    }

    public async exec(message: Message): Promise<any> {
        if (message.channel.type == "dm") return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
            msg.delete({ timeout: 30000 })
        })

        let pages = partners;
        var page  = 1;

        const currentPartner = (index: number) => {
            return pages[page - 1];
        }


        const getInvite = (guild: Guild): Promise<string> => {
            return new Promise((resolve, reject) => {
                if (guild.member(this.client.user).permissions.has('VIEW_AUDIT_LOG')) {
                    return guild.fetchInvites().then(invites => {
                        let invite: Invite = invites.random();
                        return resolve(`https://www.discord.gg/${invite.code}`);
                    })
                } else {
                    return resolve();
                }
            })
        }
        

        const getEmbed = async (index: number) => {
            const newEmbed = new MessageEmbed()
                .setTitle(`**${this.client.guilds.cache.get(currentPartner(page).guild).name}**`)
                .setDescription(`*${currentPartner(page).description}*`)
                .setFooter(`Page ${page}/${pages.length}`)
                .addFields(
                    { name: "Server", value: currentPartner(page).address },
                    { name: "Discord", value: await getInvite(this.client.guilds.cache.get(currentPartner(page).guild)) ? `[Join Here](${await getInvite(this.client.guilds.cache.get(currentPartner(page).guild))})` : "Unavailable" }
                )
                .setTimestamp()
                .setThumbnail(this.client.guilds.cache.get(currentPartner(page).guild).iconURL())
                .setColor("#1ced9d")

            return newEmbed;
        }

        return message.util.send(await getEmbed(page)).then(msg => {
            msg.react('◀').then(async r => {
                msg.react('▶').then(async r => {
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;

                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });

                    backwards.on('collect', async r => {
                        if (page === 1)
                            return await r.users.remove(message.author);

                            page--;

                            await msg.edit(await getEmbed(page));

                            return await r.users.remove(message.author);
                    })

                    forwards.on('collect', async r => {
                        if (page === pages.length)
                            return await r.users.remove(message.author);

                            page++;

                            await msg.edit(await getEmbed(page));

                            return await r.users.remove(message.author);
                    })
                })
            })
        })
    }
}
