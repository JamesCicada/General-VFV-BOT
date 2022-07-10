const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const memberSchema = require("../../Schemas/addToDB");
const Levels = require("discord-xp");
require("dotenv").config();
Levels.setURL(
    "mongodb+srv://James:James2002@discord.xoems.mongodb.net/?retryWrites=true&w=majority"
);
module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("check your level or someone's level")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("who's level do you wanna check?")
                .setRequired(false)
        ),
    async execute(interaction) {
        /*let user = interaction.options.getUser("user") || interaction.user;
        const Embed = new MessageEmbed().setColor("RANDOM");
        let userId = user.id;
        let userDb = await memberSchema.findOne({ discordId: userId });
        let xpText = userDb.textXp;
        if (user.bot) {
            interaction.reply("bot's doesn't have levels baaka 🤦‍♂️");
        } else {
            if (!xpText || xpText <= 100) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **1** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 200) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **2** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 300) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **3** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 400) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **4** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 500) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **5** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 600) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **6** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 700) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **7** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 800) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **8** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 900) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **9** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 1000) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **10** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 1500) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **11** and you have ${xpText} xp`
                        ),
                    ],
                });
            } else if (xpText <= 2000) {
                interaction.reply({
                    embeds: [
                        Embed.setDescription(
                            `${user} is level **12** and you have ${xpText} xp`
                        ),
                    ],
                });
            }*/
        const user = await Levels.fetch(
            interaction.user.id,
            interaction.guild.id
        );
        interaction.reply(
            `${interaction.user} Hey Man Your currently at Level ${user.level} and you have ${user.xp || 0} xp`
        );
    },
};
