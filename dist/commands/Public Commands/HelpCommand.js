"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const config_1 = require("../../config");
const EmbedUtil_1 = require("../../utils/EmbedUtil");
const discord_js_1 = require("discord.js");
const common_tags_1 = require("common-tags");
class HelpCommand extends discord_akairo_1.Command {
    constructor() {
        super("help", {
            aliases: ["help", "commands", "list", "cmds"],
            category: "Public Commands",
            description: {
                content: "View a list of all the commands!",
                usage: `${config_1.prefix}help [command]`,
                examples: [
                    `${config_1.prefix}help ping`,
                    `${config_1.prefix}help model`
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
    async exec(message, { command }) {
        if (message.channel.type == "dm")
            return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
                msg.delete({ timeout: 30000 });
            });
        if (command) {
            return await message.util.send(new discord_js_1.MessageEmbed()
                .setAuthor(`Help | ${command}`)
                .setThumbnail(this.client.user.avatarURL())
                .setColor("#1ced9d")
                .setDescription(common_tags_1.stripIndents `
                    **Description:**
                    ${command.description.content || "No content provided."}
                    
                    **Usage:**
                    ${command.description.usage || "No usage provided."}
                    
                    **Examples:**
                    ${command.description.examples ? command.description.examples.map(e => `\`${e}\``).join("\n") : " No examples provided."}
                `)
                .setTimestamp());
        }
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor(`Help | ${this.client.user.username}`)
            .setThumbnail(this.client.user.avatarURL())
            .setFooter(`${this.client.commandHandler.prefix}help [command] for more information on a command.`)
            .setColor("#1ced9d")
            .setTimestamp();
        for (const category of this.handler.categories.values()) {
            if (["default"].includes(category.id))
                continue;
            embed.addField(category.id, category
                .filter(cmd => cmd.aliases.length > 0)
                .map(cmd => `**\`${cmd}\`**`)
                .join(", ") || "No commands in this category.");
        }
        return message.util.send(embed);
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvUHVibGljIENvbW1hbmRzL0hlbHBDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlDO0FBRXpDLHlDQUFzQztBQUN0QyxxREFBbUQ7QUFDbkQsMkNBQTBDO0FBQzFDLDZDQUEyQztBQUUzQyxNQUFxQixXQUFZLFNBQVEsd0JBQU87SUFDNUM7UUFDSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQzdDLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFO2dCQUNULE9BQU8sRUFBRSxrQ0FBa0M7Z0JBQzNDLEtBQUssRUFBRSxHQUFHLGVBQU0sZ0JBQWdCO2dCQUNoQyxRQUFRLEVBQUU7b0JBQ04sR0FBRyxlQUFNLFdBQVc7b0JBQ3BCLEdBQUcsZUFBTSxZQUFZO2lCQUN4QjthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7WUFDWixJQUFJLEVBQUU7Z0JBQ0Y7b0JBQ0ksRUFBRSxFQUFFLFNBQVM7b0JBQ2IsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLE9BQU8sRUFBRSxJQUFJO2lCQUNoQjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBd0I7UUFDakUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJO1lBQUUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sc0JBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLHFFQUFxRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6TSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLE9BQU8sRUFBRTtZQUNULE9BQU8sTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUFZLEVBQUU7aUJBQzVDLFNBQVMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDO2lCQUM5QixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLGNBQWMsQ0FBQywwQkFBWSxDQUFBOztzQkFFdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksc0JBQXNCOzs7c0JBR3JELE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLG9CQUFvQjs7O3NCQUdqRCxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO2lCQUMzSCxDQUFDO2lCQUNELFlBQVksRUFBRSxDQUNsQixDQUFBO1NBQ0o7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUU7YUFDM0IsU0FBUyxDQUFDLFVBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEQsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sbURBQW1ELENBQUM7YUFDbEcsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixZQUFZLEVBQUUsQ0FBQTtRQUVuQixLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFBRSxTQUFTO1lBRWhELEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxRQUFRO2lCQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7aUJBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUJBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBK0IsQ0FBQyxDQUFBO1NBQ3REO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0o7QUFsRUQsOEJBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgcHJlZml4IH0gZnJvbSBcIi4uLy4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBCdWlsZEVtYmVkIH0gZnJvbSBcIi4uLy4uL3V0aWxzL0VtYmVkVXRpbFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlRW1iZWQgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBzdHJpcEluZGVudHMgfSBmcm9tIFwiY29tbW9uLXRhZ3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlbHBDb21tYW5kIGV4dGVuZHMgQ29tbWFuZCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJoZWxwXCIsIHtcclxuICAgICAgICAgICAgYWxpYXNlczogW1wiaGVscFwiLCBcImNvbW1hbmRzXCIsIFwibGlzdFwiLCBcImNtZHNcIl0sXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcIlB1YmxpYyBDb21tYW5kc1wiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJWaWV3IGEgbGlzdCBvZiBhbGwgdGhlIGNvbW1hbmRzIVwiLFxyXG4gICAgICAgICAgICAgICAgdXNhZ2U6IGAke3ByZWZpeH1oZWxwIFtjb21tYW5kXWAsXHJcbiAgICAgICAgICAgICAgICBleGFtcGxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIGAke3ByZWZpeH1oZWxwIHBpbmdgLFxyXG4gICAgICAgICAgICAgICAgICAgIGAke3ByZWZpeH1oZWxwIG1vZGVsYFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYXRlbGltaXQ6IDMsXHJcbiAgICAgICAgICAgIGFyZ3M6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJjb21tYW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjb21tYW5kQWxpYXNcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlLCB7IGNvbW1hbmQgfTogeyBjb21tYW5kOiBDb21tYW5kIH0pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChtZXNzYWdlLmNoYW5uZWwudHlwZSA9PSBcImRtXCIpIHJldHVybiBhd2FpdCBtZXNzYWdlLnV0aWwuc2VuZChhd2FpdCBCdWlsZEVtYmVkKHRoaXMuY2xpZW50LCBgKipNaW5lY3JhZnQgR2VuaWUqKmAsIGAqWW91IGFyZSBub3QgYWJsZSB0byBydW4gY29tbWFuZHMgaW4gRE1zLCB5b3UgbXVzdCBiZSBpbiBhIHNlcnZlciEqYCwgW10pKS50aGVuKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIG1zZy5kZWxldGUoeyB0aW1lb3V0OiAzMDAwMCB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLnV0aWwuc2VuZChuZXcgTWVzc2FnZUVtYmVkKClcclxuICAgICAgICAgICAgICAgIC5zZXRBdXRob3IoYEhlbHAgfCAke2NvbW1hbmR9YClcclxuICAgICAgICAgICAgICAgIC5zZXRUaHVtYm5haWwodGhpcy5jbGllbnQudXNlci5hdmF0YXJVUkwoKSlcclxuICAgICAgICAgICAgICAgIC5zZXRDb2xvcihcIiMxY2VkOWRcIilcclxuICAgICAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbihzdHJpcEluZGVudHNgXHJcbiAgICAgICAgICAgICAgICAgICAgKipEZXNjcmlwdGlvbjoqKlxyXG4gICAgICAgICAgICAgICAgICAgICR7Y29tbWFuZC5kZXNjcmlwdGlvbi5jb250ZW50IHx8IFwiTm8gY29udGVudCBwcm92aWRlZC5cIn1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAqKlVzYWdlOioqXHJcbiAgICAgICAgICAgICAgICAgICAgJHtjb21tYW5kLmRlc2NyaXB0aW9uLnVzYWdlIHx8IFwiTm8gdXNhZ2UgcHJvdmlkZWQuXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgKipFeGFtcGxlczoqKlxyXG4gICAgICAgICAgICAgICAgICAgICR7Y29tbWFuZC5kZXNjcmlwdGlvbi5leGFtcGxlcyA/IGNvbW1hbmQuZGVzY3JpcHRpb24uZXhhbXBsZXMubWFwKGUgPT4gYFxcYCR7ZX1cXGBgKS5qb2luKFwiXFxuXCIpIDogXCIgTm8gZXhhbXBsZXMgcHJvdmlkZWQuXCJ9XHJcbiAgICAgICAgICAgICAgICBgKVxyXG4gICAgICAgICAgICAgICAgLnNldFRpbWVzdGFtcCgpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IE1lc3NhZ2VFbWJlZCgpXHJcbiAgICAgICAgICAgIC5zZXRBdXRob3IoYEhlbHAgfCAke3RoaXMuY2xpZW50LnVzZXIudXNlcm5hbWV9YClcclxuICAgICAgICAgICAgLnNldFRodW1ibmFpbCh0aGlzLmNsaWVudC51c2VyLmF2YXRhclVSTCgpKVxyXG4gICAgICAgICAgICAuc2V0Rm9vdGVyKGAke3RoaXMuY2xpZW50LmNvbW1hbmRIYW5kbGVyLnByZWZpeH1oZWxwIFtjb21tYW5kXSBmb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBhIGNvbW1hbmQuYClcclxuICAgICAgICAgICAgLnNldENvbG9yKFwiIzFjZWQ5ZFwiKVxyXG4gICAgICAgICAgICAuc2V0VGltZXN0YW1wKClcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBjYXRlZ29yeSBvZiB0aGlzLmhhbmRsZXIuY2F0ZWdvcmllcy52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBpZiAoW1wiZGVmYXVsdFwiXS5pbmNsdWRlcyhjYXRlZ29yeS5pZCkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgZW1iZWQuYWRkRmllbGQoY2F0ZWdvcnkuaWQsIGNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGNtZCA9PiBjbWQuYWxpYXNlcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgLm1hcChjbWQgPT4gYCoqXFxgJHtjbWR9XFxgKipgKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKSB8fCBcIk5vIGNvbW1hbmRzIGluIHRoaXMgY2F0ZWdvcnkuXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWVzc2FnZS51dGlsLnNlbmQoZW1iZWQpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==