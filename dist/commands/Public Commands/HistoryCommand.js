"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const config_1 = require("../../config");
const EmbedUtil_1 = require("../../utils/EmbedUtil");
const minecraft_player_1 = __importDefault(require("minecraft-player"));
var moment = require('moment');
class HistoryCommand extends discord_akairo_1.Command {
    constructor() {
        super("history", {
            aliases: ["history", "names", "name", "previousnames", "namelist", "username", "usernames", "alias", "past"],
            category: "Public Commands",
            description: {
                content: "Information about a users previous username(s)!",
                usage: `${config_1.prefix}history [username/uuid]`,
                examples: [
                    `${config_1.prefix}history Reheight`,
                    `${config_1.prefix}history d4be07ab-fc80-46ca-8706-70947a8e9beb`
                ]
            },
            ratelimit: 3
        });
    }
    async exec(message) {
        if (message.channel.type == "dm")
            return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, `**Minecraft Genie**`, `*You are not able to run commands in DMs, you must be in a server!*`, [])).then(msg => {
                msg.delete({ timeout: 30000 });
            });
        let args = message.toString().split(" ").filter((value, index) => index !== 0);
        if (args.length < 1) {
            return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, "**Minecraft Genie**", "*You must provide a Username or UUID!*", [
                { name: `Usage`, value: `${this.description["usage"]}` },
                { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
            ])).then(msg => {
                msg.delete({ timeout: 60000 });
            });
        }
        if (args.length > 1) {
            return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, "**Minecraft Genie**", "*You must provide only one argument!*", [
                { name: `Usage`, value: `${this.description["usage"]}` },
                { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
            ])).then(msg => {
                msg.delete({ timeout: 60000 });
            });
        }
        const minecraftResponse = await minecraft_player_1.default(args[0]).catch(async (error) => {
            return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, "**Minecraft Genie**", `*You must provide a valid identifier!*\n**INVALID IDENTIFIER:** \`${args[0]}\``, [
                { name: `Usage`, value: `${this.description["usage"]}` },
                { name: `Examples`, value: `${this.description["examples"].join("\n")}` }
            ])).then(msg => {
                msg.delete({ timeout: 60000 });
            });
        });
        if (!minecraftResponse)
            return;
        let usernameHistory = Array();
        minecraftResponse["usernameHistory"].forEach(element => {
            let userData = { username: element["username"], changedAt: element["changedAt"] };
            usernameHistory.push(userData);
        });
        let paginatedOutput = [];
        for (var i = 0, len = usernameHistory.length; i < len; i += 5) {
            //console.log(`\n${usernameHistory.length}\n${paginatedOutput.length}\n`);
            paginatedOutput.push(usernameHistory.slice(i, i + 5));
        }
        let pages = paginatedOutput;
        let page = 1;
        let pageEmbed = async (page) => {
            return await EmbedUtil_1.BuildEmbed(this.client, `**Minecraft Genie**`, `*You are viewing the name history of: \`${minecraftResponse["username"]}\`!*`, [
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
            ]);
        };
        return await message.util.send(await pageEmbed(page)).then(async (msg) => {
            msg.react('◀').then(r => {
                msg.react('▶').then(r => {
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
                    const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 });
                    const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 });
                    backwards.on('collect', async (r) => {
                        if (page === 1)
                            return r.users.remove(message.author);
                        page--;
                        await msg.edit(await pageEmbed(page));
                        return await r.users.remove(message.author);
                    });
                    forwards.on('collect', async (r) => {
                        if (page === pages.length)
                            return r.users.remove(message.author);
                        page++;
                        await msg.edit(await pageEmbed(page));
                        return await r.users.remove(message.author);
                    });
                }).catch(() => {
                    msg.delete();
                });
            }).catch(() => {
                msg.delete();
            });
        }).catch(async (err) => {
            console.log(err);
            return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, `**Minecraft Genie**`, `*There was an error while sending you the players history!*`, [])).then(async (msg) => {
                await msg.delete({ timeout: 60000 });
            });
        });
    }
}
exports.default = HistoryCommand;
const pageResults = (data) => {
    let response = "";
    data.forEach(user => {
        response += `${user.username} [${user.changedAt ? moment(user.changedAt).format("MM/DD/YYYY") : "Original"}]\n`;
    });
    return response;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlzdG9yeUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvUHVibGljIENvbW1hbmRzL0hpc3RvcnlDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQXlDO0FBRXpDLHlDQUFzQztBQUN0QyxxREFBbUQ7QUFDbkQsd0VBQXlDO0FBQ3pDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQU8vQixNQUFxQixjQUFlLFNBQVEsd0JBQU87SUFDL0M7UUFDSSxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDNUcsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLGlEQUFpRDtnQkFDMUQsS0FBSyxFQUFFLEdBQUcsZUFBTSx5QkFBeUI7Z0JBQ3pDLFFBQVEsRUFBRTtvQkFDTixHQUFHLGVBQU0sa0JBQWtCO29CQUMzQixHQUFHLGVBQU0sOENBQThDO2lCQUMxRDthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDO0lBR00sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFnQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUk7WUFBRSxPQUFPLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxzQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUscUJBQXFCLEVBQUUscUVBQXFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pNLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFP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QUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtnQkFDckssTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTlIRCxpQ0E4SEM7QUFFRCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQW9CLEVBQVUsRUFBRTtJQUNqRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoQixRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQTtJQUNuSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IHByZWZpeCB9IGZyb20gXCIuLi8uLi9jb25maWdcIjtcclxuaW1wb3J0IHsgQnVpbGRFbWJlZCB9IGZyb20gXCIuLi8uLi91dGlscy9FbWJlZFV0aWxcIjtcclxuaW1wb3J0IE1pbmVjcmFmdCBmcm9tIFwibWluZWNyYWZ0LXBsYXllclwiO1xyXG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XHJcblxyXG5pbnRlcmZhY2UgdXNlcm5hbWVEYXRhIHtcclxuICAgIHVzZXJuYW1lOiBzdHJpbmcsXHJcbiAgICBjaGFuZ2VkQXQ/OiBEYXRlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhpc3RvcnlDb21tYW5kIGV4dGVuZHMgQ29tbWFuZCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJoaXN0b3J5XCIsIHtcclxuICAgICAgICAgICAgYWxpYXNlczogW1wiaGlzdG9yeVwiLCBcIm5hbWVzXCIsIFwibmFtZVwiLCBcInByZXZpb3VzbmFtZXNcIiwgXCJuYW1lbGlzdFwiLCBcInVzZXJuYW1lXCIsIFwidXNlcm5hbWVzXCIsIFwiYWxpYXNcIiwgXCJwYXN0XCJdLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogXCJQdWJsaWMgQ29tbWFuZHNcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiSW5mb3JtYXRpb24gYWJvdXQgYSB1c2VycyBwcmV2aW91cyB1c2VybmFtZShzKSFcIixcclxuICAgICAgICAgICAgICAgIHVzYWdlOiBgJHtwcmVmaXh9aGlzdG9yeSBbdXNlcm5hbWUvdXVpZF1gLFxyXG4gICAgICAgICAgICAgICAgZXhhbXBsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBgJHtwcmVmaXh9aGlzdG9yeSBSZWhlaWdodGAsXHJcbiAgICAgICAgICAgICAgICAgICAgYCR7cHJlZml4fWhpc3RvcnkgZDRiZTA3YWItZmM4MC00NmNhLTg3MDYtNzA5NDdhOGU5YmViYFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYXRlbGltaXQ6IDNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBleGVjKG1lc3NhZ2U6IE1lc3NhZ2UpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmIChtZXNzYWdlLmNoYW5uZWwudHlwZSA9PSBcImRtXCIpIHJldHVybiBhd2FpdCBtZXNzYWdlLnV0aWwuc2VuZChhd2FpdCBCdWlsZEVtYmVkKHRoaXMuY2xpZW50LCBgKipNaW5lY3JhZnQgR2VuaWUqKmAsIGAqWW91IGFyZSBub3QgYWJsZSB0byBydW4gY29tbWFuZHMgaW4gRE1zLCB5b3UgbXVzdCBiZSBpbiBhIHNlcnZlciEqYCwgW10pKS50aGVuKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIG1zZy5kZWxldGUoeyB0aW1lb3V0OiAzMDAwMCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFyZ3M6IHN0cmluZ1tdID0gbWVzc2FnZS50b1N0cmluZygpLnNwbGl0KFwiIFwiKS5maWx0ZXIoKHZhbHVlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IGluZGV4ICE9PSAwKTtcclxuXHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgbWVzc2FnZS51dGlsLnNlbmQoYXdhaXQgQnVpbGRFbWJlZCh0aGlzLmNsaWVudCwgXCIqKk1pbmVjcmFmdCBHZW5pZSoqXCIsIFwiKllvdSBtdXN0IHByb3ZpZGUgYSBVc2VybmFtZSBvciBVVUlEISpcIiwgW1xyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBgVXNhZ2VgLCB2YWx1ZTogYCR7dGhpcy5kZXNjcmlwdGlvbltcInVzYWdlXCJdfWAgfSxcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogYEV4YW1wbGVzYCwgdmFsdWU6IGAke3RoaXMuZGVzY3JpcHRpb25bXCJleGFtcGxlc1wiXS5qb2luKFwiXFxuXCIpfWAgfVxyXG4gICAgICAgICAgICBdKSkudGhlbihtc2cgPT4ge1xyXG4gICAgICAgICAgICAgICAgbXNnLmRlbGV0ZSh7IHRpbWVvdXQ6IDYwMDAwIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgbWVzc2FnZS51dGlsLnNlbmQoYXdhaXQgQnVpbGRFbWJlZCh0aGlzLmNsaWVudCwgXCIqKk1pbmVjcmFmdCBHZW5pZSoqXCIsIFwiKllvdSBtdXN0IHByb3ZpZGUgb25seSBvbmUgYXJndW1lbnQhKlwiLCBbXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGBVc2FnZWAsIHZhbHVlOiBgJHt0aGlzLmRlc2NyaXB0aW9uW1widXNhZ2VcIl19YCB9LFxyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBgRXhhbXBsZXNgLCB2YWx1ZTogYCR7dGhpcy5kZXNjcmlwdGlvbltcImV4YW1wbGVzXCJdLmpvaW4oXCJcXG5cIil9YCB9XHJcbiAgICAgICAgICAgIF0pKS50aGVuKG1zZyA9PiB7XHJcbiAgICAgICAgICAgICAgICBtc2cuZGVsZXRlKHsgdGltZW91dDogNjAwMDAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG1pbmVjcmFmdFJlc3BvbnNlOiBhbnkgPSBhd2FpdCBNaW5lY3JhZnQoYXJnc1swXSkuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLnV0aWwuc2VuZChhd2FpdCBCdWlsZEVtYmVkKHRoaXMuY2xpZW50LCBcIioqTWluZWNyYWZ0IEdlbmllKipcIiwgYCpZb3UgbXVzdCBwcm92aWRlIGEgdmFsaWQgaWRlbnRpZmllciEqXFxuKipJTlZBTElEIElERU5USUZJRVI6KiogXFxgJHthcmdzWzBdfVxcYGAsIFtcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogYFVzYWdlYCwgdmFsdWU6IGAke3RoaXMuZGVzY3JpcHRpb25bXCJ1c2FnZVwiXX1gIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGBFeGFtcGxlc2AsIHZhbHVlOiBgJHt0aGlzLmRlc2NyaXB0aW9uW1wiZXhhbXBsZXNcIl0uam9pbihcIlxcblwiKX1gIH1cclxuICAgICAgICAgICAgXSkpLnRoZW4obXNnID0+IHtcclxuICAgICAgICAgICAgICAgIG1zZy5kZWxldGUoeyB0aW1lb3V0OiA2MDAwMCB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAoIW1pbmVjcmFmdFJlc3BvbnNlKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHVzZXJuYW1lSGlzdG9yeSA9IEFycmF5PHVzZXJuYW1lRGF0YT4oKTtcclxuXHJcbiAgICAgICAgbWluZWNyYWZ0UmVzcG9uc2VbXCJ1c2VybmFtZUhpc3RvcnlcIl0uZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IHVzZXJEYXRhOiB1c2VybmFtZURhdGEgPSB7IHVzZXJuYW1lOiBlbGVtZW50W1widXNlcm5hbWVcIl0sIGNoYW5nZWRBdDogZWxlbWVudFtcImNoYW5nZWRBdFwiXSB9O1xyXG4gICAgICAgICAgICB1c2VybmFtZUhpc3RvcnkucHVzaCh1c2VyRGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwYWdpbmF0ZWRPdXRwdXQgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHVzZXJuYW1lSGlzdG9yeS5sZW5ndGg7IGkgPCBsZW47IGkgKz0gNSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBcXG4ke3VzZXJuYW1lSGlzdG9yeS5sZW5ndGh9XFxuJHtwYWdpbmF0ZWRPdXRwdXQubGVuZ3RofVxcbmApO1xyXG4gICAgICAgICAgICBwYWdpbmF0ZWRPdXRwdXQucHVzaCh1c2VybmFtZUhpc3Rvcnkuc2xpY2UoaSwgaSArIDUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYWdlcyA9IHBhZ2luYXRlZE91dHB1dDtcclxuICAgICAgICBsZXQgcGFnZSAgPSAxO1xyXG5cclxuICAgICAgICBsZXQgcGFnZUVtYmVkID0gYXN5bmMgKHBhZ2U6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgQnVpbGRFbWJlZCh0aGlzLmNsaWVudCwgYCoqTWluZWNyYWZ0IEdlbmllKipgLCBgKllvdSBhcmUgdmlld2luZyB0aGUgbmFtZSBoaXN0b3J5IG9mOiBcXGAke21pbmVjcmFmdFJlc3BvbnNlW1widXNlcm5hbWVcIl19XFxgISpgLCBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYEhpc3RvcnlgLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgXFxgXFxgXFxgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3BhZ2VSZXN1bHRzKHBhZ2VzW3BhZ2UgLSAxXSl9YCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBcXGBcXGBcXGBgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGBQYWdlYCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYCR7cGFnZX0vJHtwYWdlcy5sZW5ndGh9YFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG1lc3NhZ2UudXRpbC5zZW5kKGF3YWl0IHBhZ2VFbWJlZChwYWdlKSkudGhlbihhc3luYyAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIG1zZy5yZWFjdCgn4peAJykudGhlbihyID0+IHtcclxuICAgICAgICAgICAgICAgIG1zZy5yZWFjdCgn4pa2JykudGhlbihyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWNrd2FyZHNGaWx0ZXIgPSAocmVhY3Rpb24sIHVzZXIpID0+IHJlYWN0aW9uLmVtb2ppLm5hbWUgPT09ICfil4AnICYmIHVzZXIuaWQgPT09IG1lc3NhZ2UuYXV0aG9yLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcndhcmRzRmlsdGVyID0gKHJlYWN0aW9uLCB1c2VyKSA9PiByZWFjdGlvbi5lbW9qaS5uYW1lID09PSAn4pa2JyAmJiB1c2VyLmlkID09PSBtZXNzYWdlLmF1dGhvci5pZDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhY2t3YXJkcyA9IG1zZy5jcmVhdGVSZWFjdGlvbkNvbGxlY3RvcihiYWNrd2FyZHNGaWx0ZXIsIHsgdGltZTogNjAwMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9yd2FyZHMgPSBtc2cuY3JlYXRlUmVhY3Rpb25Db2xsZWN0b3IoZm9yd2FyZHNGaWx0ZXIsIHsgdGltZTogNjAwMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja3dhcmRzLm9uKCdjb2xsZWN0JywgYXN5bmMgciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWdlID09PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudXNlcnMucmVtb3ZlKG1lc3NhZ2UuYXV0aG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UtLTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtc2cuZWRpdChhd2FpdCBwYWdlRW1iZWQocGFnZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgci51c2Vycy5yZW1vdmUobWVzc2FnZS5hdXRob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3J3YXJkcy5vbignY29sbGVjdCcsIGFzeW5jIHIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFnZSA9PT0gcGFnZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudXNlcnMucmVtb3ZlKG1lc3NhZ2UuYXV0aG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2UrKztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtc2cuZWRpdChhd2FpdCBwYWdlRW1iZWQocGFnZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgci51c2Vycy5yZW1vdmUobWVzc2FnZS5hdXRob3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbXNnLmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pLmNhdGNoKGFzeW5jIChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IG1lc3NhZ2UudXRpbC5zZW5kKGF3YWl0IEJ1aWxkRW1iZWQodGhpcy5jbGllbnQsIGAqKk1pbmVjcmFmdCBHZW5pZSoqYCwgYCpUaGVyZSB3YXMgYW4gZXJyb3Igd2hpbGUgc2VuZGluZyB5b3UgdGhlIHBsYXllcnMgaGlzdG9yeSEqYCwgW10pKS50aGVuKGFzeW5jIG1zZyA9PiB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBtc2cuZGVsZXRlKHsgdGltZW91dDogNjAwMDAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgcGFnZVJlc3VsdHMgPSAoZGF0YTogdXNlcm5hbWVEYXRhW10pOiBzdHJpbmcgPT4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gXCJcIjtcclxuXHJcbiAgICBkYXRhLmZvckVhY2godXNlciA9PiB7XHJcbiAgICAgICAgcmVzcG9uc2UgKz0gYCR7dXNlci51c2VybmFtZX0gWyR7dXNlci5jaGFuZ2VkQXQgPyBtb21lbnQodXNlci5jaGFuZ2VkQXQpLmZvcm1hdChcIk1NL0REL1lZWVlcIikgOiBcIk9yaWdpbmFsXCJ9XVxcbmBcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG59XHJcbiJdfQ==