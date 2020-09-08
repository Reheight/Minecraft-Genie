import { MessageEmbed } from "discord.js";
import { AkairoClient } from "discord-akairo";

interface Fields {
    name: String,
    value: String,
    inline?: boolean
}

export const BuildEmbed = async (client: AkairoClient, title: string, description: string, fields: Fields[], image?: string[]): Promise<MessageEmbed> => {
    let embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .addFields(fields)
    .setTimestamp()
    .setFooter("Reheight#4947")
    .setColor("#1ced9d")
    .setThumbnail(client.user.avatarURL())

    if (image) {
        embed.attachFiles([...image])
        let imageShown = image[0].split('/').pop();
        embed.setImage(`attachment://${imageShown}`)
    }

    return await embed;
}