"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const path_1 = require("path");
const config_1 = require("../config");
class BotClient extends discord_akairo_1.AkairoClient {
    constructor(config) {
        super({
            ownerID: config.owners
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.join(__dirname, "..", "listeners")
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.join(__dirname, "..", "commands"),
            prefix: config_1.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            defaultCooldown: 6e4,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => `${str}\n\nType \`cancel\` to cancel the command...`,
                    modifyRetry: (_, str) => `${str}\n\nType \`cancel\` to cancel the command...`,
                    timeout: "You took too long to respond, the command has been cancelled...",
                    ended: "You exeeeded the maximum amount of tries, the command has now been cancelled...",
                    cancel: "This command has been cancelled...",
                    retries: 3,
                    time: 3e4
                },
                otherwise: ""
            },
            ignorePermissions: config_1.owners
        });
        this.config = config;
    }
    async _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHander: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
    async start() {
        await this._init();
        await this.login(this.config.token);
        return await this.user.setActivity("Minecraft", { type: "PLAYING" });
    }
}
exports.default = BotClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBK0U7QUFFL0UsK0JBQTRCO0FBQzVCLHNDQUEyQztBQWMzQyxNQUFxQixTQUFVLFNBQVEsNkJBQVk7SUE0Qi9DLFlBQW1CLE1BQWtCO1FBQ2pDLEtBQUssQ0FBQztZQUNGLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUE7UUE3QkMsb0JBQWUsR0FBb0IsSUFBSSxnQ0FBZSxDQUFDLElBQUksRUFBRTtZQUNoRSxTQUFTLEVBQUUsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO1NBQ2hELENBQUMsQ0FBQTtRQUNLLG1CQUFjLEdBQW1CLElBQUksK0JBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDN0QsU0FBUyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQztZQUM1QyxNQUFNLEVBQUUsZUFBTTtZQUNkLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLG1CQUFtQixFQUFFLEdBQUc7WUFDeEIsZUFBZSxFQUFFLEdBQUc7WUFDcEIsZ0JBQWdCLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLFdBQVcsRUFBRSxDQUFDLENBQVUsRUFBRSxHQUFXLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyw4Q0FBOEM7b0JBQ3RHLFdBQVcsRUFBRSxDQUFDLENBQVUsRUFBRSxHQUFXLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyw4Q0FBOEM7b0JBQ3RHLE9BQU8sRUFBRSxpRUFBaUU7b0JBQzFFLEtBQUssRUFBRSxpRkFBaUY7b0JBQ3hGLE1BQU0sRUFBRSxvQ0FBb0M7b0JBQzVDLE9BQU8sRUFBRSxDQUFDO29CQUNWLElBQUksRUFBRSxHQUFHO2lCQUNaO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2hCO1lBQ0QsaUJBQWlCLEVBQUUsZUFBTTtTQUM1QixDQUFDLENBQUM7UUFPQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRU8sS0FBSyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbEMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLE9BQU87U0FDVixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLO1FBQ2QsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FDSjtBQXZERCw0QkF1REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBa2Fpcm9DbGllbnQsIENvbW1hbmRIYW5kbGVyLCBMaXN0ZW5lckhhbmRsZXIgfSBmcm9tIFwiZGlzY29yZC1ha2Fpcm9cIjtcclxuaW1wb3J0IHsgVXNlciwgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBwcmVmaXgsIG93bmVycyB9IGZyb20gXCIuLi9jb25maWdcIjtcclxuXHJcbmRlY2xhcmUgbW9kdWxlIFwiZGlzY29yZC1ha2Fpcm9cIiB7XHJcbiAgICBpbnRlcmZhY2UgQWthaXJvQ2xpZW50IHtcclxuICAgICAgICBjb21tYW5kSGFuZGxlcjogQ29tbWFuZEhhbmRsZXIsXHJcbiAgICAgICAgbGlzdGVuZXJIYW5kbGVyOiBMaXN0ZW5lckhhbmRsZXJcclxuICAgIH1cclxufVxyXG5cclxuaW50ZXJmYWNlIEJvdE9wdGlvbnMge1xyXG4gICAgdG9rZW4/OiBzdHJpbmc7XHJcbiAgICBvd25lcnM/OiBzdHJpbmcgfCBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm90Q2xpZW50IGV4dGVuZHMgQWthaXJvQ2xpZW50IHtcclxuICAgIHB1YmxpYyBjb25maWc6IEJvdE9wdGlvbnM7XHJcbiAgICBwdWJsaWMgbGlzdGVuZXJIYW5kbGVyOiBMaXN0ZW5lckhhbmRsZXIgPSBuZXcgTGlzdGVuZXJIYW5kbGVyKHRoaXMsIHtcclxuICAgICAgICBkaXJlY3Rvcnk6IGpvaW4oX19kaXJuYW1lLCBcIi4uXCIsIFwibGlzdGVuZXJzXCIpXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGNvbW1hbmRIYW5kbGVyOiBDb21tYW5kSGFuZGxlciA9IG5ldyBDb21tYW5kSGFuZGxlcih0aGlzLCB7XHJcbiAgICAgICAgZGlyZWN0b3J5OiBqb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcImNvbW1hbmRzXCIpLFxyXG4gICAgICAgIHByZWZpeDogcHJlZml4LFxyXG4gICAgICAgIGFsbG93TWVudGlvbjogdHJ1ZSxcclxuICAgICAgICBoYW5kbGVFZGl0czogdHJ1ZSxcclxuICAgICAgICBjb21tYW5kVXRpbDogdHJ1ZSxcclxuICAgICAgICBjb21tYW5kVXRpbExpZmV0aW1lOiAzZTUsXHJcbiAgICAgICAgZGVmYXVsdENvb2xkb3duOiA2ZTQsXHJcbiAgICAgICAgYXJndW1lbnREZWZhdWx0czoge1xyXG4gICAgICAgICAgICBwcm9tcHQ6IHtcclxuICAgICAgICAgICAgICAgIG1vZGlmeVN0YXJ0OiAoXzogTWVzc2FnZSwgc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7c3RyfVxcblxcblR5cGUgXFxgY2FuY2VsXFxgIHRvIGNhbmNlbCB0aGUgY29tbWFuZC4uLmAsXHJcbiAgICAgICAgICAgICAgICBtb2RpZnlSZXRyeTogKF86IE1lc3NhZ2UsIHN0cjogc3RyaW5nKTogc3RyaW5nID0+IGAke3N0cn1cXG5cXG5UeXBlIFxcYGNhbmNlbFxcYCB0byBjYW5jZWwgdGhlIGNvbW1hbmQuLi5gLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dDogXCJZb3UgdG9vayB0b28gbG9uZyB0byByZXNwb25kLCB0aGUgY29tbWFuZCBoYXMgYmVlbiBjYW5jZWxsZWQuLi5cIixcclxuICAgICAgICAgICAgICAgIGVuZGVkOiBcIllvdSBleGVlZWRlZCB0aGUgbWF4aW11bSBhbW91bnQgb2YgdHJpZXMsIHRoZSBjb21tYW5kIGhhcyBub3cgYmVlbiBjYW5jZWxsZWQuLi5cIixcclxuICAgICAgICAgICAgICAgIGNhbmNlbDogXCJUaGlzIGNvbW1hbmQgaGFzIGJlZW4gY2FuY2VsbGVkLi4uXCIsXHJcbiAgICAgICAgICAgICAgICByZXRyaWVzOiAzLFxyXG4gICAgICAgICAgICAgICAgdGltZTogM2U0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG90aGVyd2lzZTogXCJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWdub3JlUGVybWlzc2lvbnM6IG93bmVyc1xyXG4gICAgfSk7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNvbmZpZzogQm90T3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKHtcclxuICAgICAgICAgICAgb3duZXJJRDogY29uZmlnLm93bmVyc1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgX2luaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kSGFuZGxlci51c2VMaXN0ZW5lckhhbmRsZXIodGhpcy5saXN0ZW5lckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJIYW5kbGVyLnNldEVtaXR0ZXJzKHtcclxuICAgICAgICAgICAgY29tbWFuZEhhbmRlcjogdGhpcy5jb21tYW5kSGFuZGxlcixcclxuICAgICAgICAgICAgbGlzdGVuZXJIYW5kbGVyOiB0aGlzLmxpc3RlbmVySGFuZGxlcixcclxuICAgICAgICAgICAgcHJvY2Vzc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbW1hbmRIYW5kbGVyLmxvYWRBbGwoKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVySGFuZGxlci5sb2FkQWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmxvZ2luKHRoaXMuY29uZmlnLnRva2VuKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudXNlci5zZXRBY3Rpdml0eShcIk1pbmVjcmFmdFwiLCB7IHR5cGU6IFwiUExBWUlOR1wiIH0pO1xyXG4gICAgfVxyXG59Il19