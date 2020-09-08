"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const config_1 = require("../../config");
const EmbedUtil_1 = require("../../utils/EmbedUtil");
class PingCommand extends discord_akairo_1.Command {
    constructor() {
        super("ping", {
            aliases: ["ping", "connection", "ms", "tps"],
            category: "Public Commands",
            description: {
                content: "Check the latence of the ping to the Discord API",
                usage: `${config_1.prefix}ping`,
                examples: [
                    `${config_1.prefix}ping`
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
        return await message.util.send(await EmbedUtil_1.BuildEmbed(this.client, "**Minecraft Genie**", "*The following latency is my latency between my host and the Discord API!*", [
            { name: "Latency", value: `${this.client.ws.ping}ms` }
        ])).then(msg => {
            msg.delete({ timeout: 60000 });
        });
    }
}
exports.default = PingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZ0NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvUHVibGljIENvbW1hbmRzL1BpbmdDb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlDO0FBRXpDLHlDQUFzQztBQUN0QyxxREFBbUQ7QUFFbkQsTUFBcUIsV0FBWSxTQUFRLHdCQUFPO0lBQzVDO1FBQ0ksS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztZQUM1QyxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsa0RBQWtEO2dCQUMzRCxLQUFLLEVBQUUsR0FBRyxlQUFNLE1BQU07Z0JBQ3RCLFFBQVEsRUFBRTtvQkFDTixHQUFHLGVBQU0sTUFBTTtpQkFDbEI7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJO1lBQUUsT0FBTyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sc0JBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLHFFQUFxRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6TSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxzQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUscUJBQXFCLEVBQUUsNEVBQTRFLEVBQUU7WUFDOUosRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO1NBQ3pELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNsQyxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSjtBQTNCRCw4QkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBwcmVmaXggfSBmcm9tIFwiLi4vLi4vY29uZmlnXCI7XHJcbmltcG9ydCB7IEJ1aWxkRW1iZWQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvRW1iZWRVdGlsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaW5nQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwicGluZ1wiLCB7XHJcbiAgICAgICAgICAgIGFsaWFzZXM6IFtcInBpbmdcIiwgXCJjb25uZWN0aW9uXCIsIFwibXNcIiwgXCJ0cHNcIl0sXHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBcIlB1YmxpYyBDb21tYW5kc1wiLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogXCJDaGVjayB0aGUgbGF0ZW5jZSBvZiB0aGUgcGluZyB0byB0aGUgRGlzY29yZCBBUElcIixcclxuICAgICAgICAgICAgICAgIHVzYWdlOiBgJHtwcmVmaXh9cGluZ2AsXHJcbiAgICAgICAgICAgICAgICBleGFtcGxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIGAke3ByZWZpeH1waW5nYFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYXRlbGltaXQ6IDNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgZXhlYyhtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZiAobWVzc2FnZS5jaGFubmVsLnR5cGUgPT0gXCJkbVwiKSByZXR1cm4gYXdhaXQgbWVzc2FnZS51dGlsLnNlbmQoYXdhaXQgQnVpbGRFbWJlZCh0aGlzLmNsaWVudCwgYCoqTWluZWNyYWZ0IEdlbmllKipgLCBgKllvdSBhcmUgbm90IGFibGUgdG8gcnVuIGNvbW1hbmRzIGluIERNcywgeW91IG11c3QgYmUgaW4gYSBzZXJ2ZXIhKmAsIFtdKSkudGhlbihtc2cgPT4ge1xyXG4gICAgICAgICAgICBtc2cuZGVsZXRlKHsgdGltZW91dDogMzAwMDAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBhd2FpdCBtZXNzYWdlLnV0aWwuc2VuZChhd2FpdCBCdWlsZEVtYmVkKHRoaXMuY2xpZW50LCBcIioqTWluZWNyYWZ0IEdlbmllKipcIiwgXCIqVGhlIGZvbGxvd2luZyBsYXRlbmN5IGlzIG15IGxhdGVuY3kgYmV0d2VlbiBteSBob3N0IGFuZCB0aGUgRGlzY29yZCBBUEkhKlwiLCBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJMYXRlbmN5XCIsIHZhbHVlOiBgJHt0aGlzLmNsaWVudC53cy5waW5nfW1zYCB9XHJcbiAgICAgICAgXSkpLnRoZW4obXNnID0+IHtcclxuICAgICAgICAgICAgbXNnLmRlbGV0ZSh7IHRpbWVvdXQ6IDYwMDAwIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=