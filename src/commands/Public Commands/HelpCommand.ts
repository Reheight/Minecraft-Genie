import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { prefix } from "../../config";
import { BuildEmbed } from "../../utils/EmbedUtil";
import { MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";

export default class HelpCommand extends Command {
    public constructor() {
        super("help", {
            aliases: ["help", "commands", "list", "cmds"],
            category: "Public Commands",
            description: {
                content: "View a list of all the commands!",
                usage: `${prefix}help [command]`,
                examples: [
                    `${prefix}help ping`,
                    `${prefix}help model`
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "command",
                    type: "commandAlias",
                    default: null
                }
            ]
        });
    }

    public async exec(message: Message, { command }: { command: Command }): Promise<any> {
        if (message.channel.type == "dm") return await message.util.send(await BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
            msg.delete({ timeout: 30000 })
        })

        if (command) {
            return await message.util.send(new MessageEmbed()
                .setAuthor(`Help | ${command}`)
                .setThumbnail(this.client.user.avatarURL())
                .setColor("#1ced9d")
                .setDescription(stripIndents`
                    **Description:**
                    ${command.description.content || "No content provided."}
                    
                    **Usage:**
                    ${command.description.usage || "No usage provided."}
                    
                    **Examples:**
                    ${command.description.examples ? command.description.examples.map(e => `\`${e}\``).join("\n") : " No examples provided."}
                `)
                .setTimestamp()
            )
        }

        const embed = new MessageEmbed()
            .setAuthor(`Help | ${this.client.user.username}`)
            .setThumbnail(this.client.user.avatarURL())
            .setFooter(`${this.client.commandHandler.prefix}help [command] for more information on a command.`)
            .setColor("#1ced9d")
            .setTimestamp()

        for (const category of this.handler.categories.values()) {
            if (["default"].includes(category.id)) continue;

            embed.addField(category.id, category
                .filter(cmd => cmd.aliases.length > 0)
                .map(cmd => `**\`${cmd}\`**`)
                .join(", ") || "No commands in this category.")
        }

        return message.util.send(embed);
    }
}
