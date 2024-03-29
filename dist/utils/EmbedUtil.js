"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildEmbed = void 0;
const discord_js_1 = require("discord.js");
exports.BuildEmbed = async (client, title, description, fields, image) => {
    let embed = new discord_js_1.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .addFields(fields)
        .setTimestamp()
        .setFooter("Reheight#4947")
        .setColor("#1ced9d")
        .setThumbnail(client.user.avatarURL());
    if (image) {
        embed.attachFiles([...image]);
        let imageShown = image[0].split('/').pop();
        embed.setImage(`attachment://${imageShown}`);
    }
    return await embed;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1iZWRVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0VtYmVkVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBMEM7QUFTN0IsUUFBQSxVQUFVLEdBQUcsS0FBSyxFQUFFLE1BQW9CLEVBQUUsS0FBYSxFQUFFLFdBQW1CLEVBQUUsTUFBZ0IsRUFBRSxLQUFnQixFQUF5QixFQUFFO0lBQ3BKLElBQUksS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRTtTQUM3QixRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ2YsY0FBYyxDQUFDLFdBQVcsQ0FBQztTQUMzQixTQUFTLENBQUMsTUFBTSxDQUFDO1NBQ2pCLFlBQVksRUFBRTtTQUNkLFNBQVMsQ0FBQyxlQUFlLENBQUM7U0FDMUIsUUFBUSxDQUFDLFNBQVMsQ0FBQztTQUNuQixZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO0lBRXRDLElBQUksS0FBSyxFQUFFO1FBQ1AsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUM3QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNDLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLFVBQVUsRUFBRSxDQUFDLENBQUE7S0FDL0M7SUFFRCxPQUFPLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2VFbWJlZCB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IEFrYWlyb0NsaWVudCB9IGZyb20gXCJkaXNjb3JkLWFrYWlyb1wiO1xyXG5cclxuaW50ZXJmYWNlIEZpZWxkcyB7XHJcbiAgICBuYW1lOiBTdHJpbmcsXHJcbiAgICB2YWx1ZTogU3RyaW5nLFxyXG4gICAgaW5saW5lPzogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQnVpbGRFbWJlZCA9IGFzeW5jIChjbGllbnQ6IEFrYWlyb0NsaWVudCwgdGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgZmllbGRzOiBGaWVsZHNbXSwgaW1hZ2U/OiBzdHJpbmdbXSk6IFByb21pc2U8TWVzc2FnZUVtYmVkPiA9PiB7XHJcbiAgICBsZXQgZW1iZWQgPSBuZXcgTWVzc2FnZUVtYmVkKClcclxuICAgIC5zZXRUaXRsZSh0aXRsZSlcclxuICAgIC5zZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgIC5hZGRGaWVsZHMoZmllbGRzKVxyXG4gICAgLnNldFRpbWVzdGFtcCgpXHJcbiAgICAuc2V0Rm9vdGVyKFwiUmVoZWlnaHQjNDk0N1wiKVxyXG4gICAgLnNldENvbG9yKFwiIzFjZWQ5ZFwiKVxyXG4gICAgLnNldFRodW1ibmFpbChjbGllbnQudXNlci5hdmF0YXJVUkwoKSlcclxuXHJcbiAgICBpZiAoaW1hZ2UpIHtcclxuICAgICAgICBlbWJlZC5hdHRhY2hGaWxlcyhbLi4uaW1hZ2VdKVxyXG4gICAgICAgIGxldCBpbWFnZVNob3duID0gaW1hZ2VbMF0uc3BsaXQoJy8nKS5wb3AoKTtcclxuICAgICAgICBlbWJlZC5zZXRJbWFnZShgYXR0YWNobWVudDovLyR7aW1hZ2VTaG93bn1gKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhd2FpdCBlbWJlZDtcclxufSJdfQ==