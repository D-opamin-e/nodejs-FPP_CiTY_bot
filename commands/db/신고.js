var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dopamine2312@@",
    database: "sunam_test",
});
const fs = require('fs');
const request = require('request');
const moment = require("moment");
require("moment-duration-format");
const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback)
    })
}
var drpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\report\\` //파일 저장 끝
module.exports = {
    name: "신고",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        var daay = `${moment(message.createdAt).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}` //파일 저장 관련
        if (message.attachments.size > 0) {
            if (!fs.existsSync(`${drpath}./${message.author.id}`)) {
                fs.mkdir(`${drpath}./${message.author.id}`, 0666, function (err) {
                    if (err) throw err;
                    console.log(`D드라이브 report 폴더생성 완료`);
                })
            }
            var Attachment = (message.attachments).array();
            const url = `${Attachment[0].url}`
            const randoom = `${Math.random().toString(36).substr(2, 11)}`
            var ddpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\report\\${message.author.id}\\${randoom}${Attachment[0].filename}`
                download(url, ddpath, () => {
                    console.log('D 드라이브 저장 완료')
                })
            setTimeout(function () {
                message.delete();
            }, 500)
            let member = message.mentions.members.first() || message.member
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
            if (rUser.roles.some(r => ["Manager ▲", "예비 매니저", "-"].includes(r.name))) {
                message.author.send({
                    embed: {
                        title: `[FPP CITY 신고 실패]`,
                        description: `매니저들을 신고 대상으로 지목하는 경우가 종종 발생하여, 매니저들을 신고 대상으로 지목 할 수 없게 개발되었습니다.\n혹여나 매니저들 중, 신고 대상이 존재한다면 ?문의 명령어로 말씀 해주신다면 확인 후 처리 도와드리겠습니다\n\n명령어 사용법 : https://dopamine.gq/FPP/howuse.php`,
                        color: 0xff3c00
                    }
                })
                return;
            }
            if (!rUser) return message.author.send({
                embed: {
                    title: `[FPP CITY 신고 실패]`,
                    description: `신고 대상을 서버에서 찾을 수 없습니다.\n신고 대상의 닉네임과 사유를 매니저분에게 DM 부탁드립니다.`,
                    color: 0xff3c00
                }
            })
            let rreason = args.join(" ").slice(22);
            if (!rreason) return message.author.send({
                embed: {
                    title: `[FPP CITY 신고 실패]`,
                    description: `신고 사유를 작성해주세요.`,
                    color: 0xff3c00
                }
            })
            var log = "INSERT INTO discord_file_data (state, id, filename, time, fullname, rUser, reason) VALUES ?";
            var values = [
                [`[ 신고 ]`, `${message.author.id}`, `${Attachment[0].filename}`, `${daay}`, `${randoom}${Attachment[0].filename}`, `${rUser.id}`, `${rreason}`]
            ];
            connection.query(log, [values], function (err, result) {
            })
            client.channels.get("585761109496299521") //warning 채널
                .send({
                    embed: {
                        title: "[ FPP CITY 신고 ]",
                        description: `**신고자**\n닉네임: ${message.author}\n아이디: ${message.author.id}\n\n**대상자**\n닉네임: ${rUser}\n아이디: ${rUser.id}\n지급된 역할: ${member.roles.map(r => `${r}`).join(' | ')}\n\n**신고일**\n${daay}\n\n**사유**\n${rreason}\n\n**첨부파일**https://dopamine.gq/FPP/file/report/${message.author.id}/${randoom}${Attachment[0].filename}`,
                        color: 0xff3c00,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                    }
                })
                .then(function (message) {
                    message.react('🆗')
                    message.react('❌')
                });
            message.author.send({
                embed: {
                    title: "[ FPP CITY 파일 첨부 신고 ]",
                    description: `**신고자**\n닉네임: ${message.author}\n아이디: ${message.author.id}\n\n**대상자**\n닉네임: ${rUser}\n아이디: ${rUser.id}\n지급된 역할: ${member.roles.map(r => `${r}`).join(' | ')}\n\n**신고일**\n${daay}\n\n**사유**\n${rreason}\n\n**첨부파일**https://dopamine.gq/FPP/file/report/${message.author.id}/${randoom}${Attachment[0].filename}`,
                    color: 0xff3c00,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                }
            })
            client.channels.get("675920116776697911")
                .send({
                    embed: {
                        title: "파일 신고 명령어 로그",
                        description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}\n링크 :${url}`,
                        color: 0xff3c00,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                    }
                })
        } else {
            message.delete();
            let member = message.mentions.members.first() || message.member
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
            if (rUser.roles.some(r => ["Manager ▲", "예비 매니저", "-"].includes(r.name))) {
                message.author.send({
                    embed: {
                        title: `[FPP CITY 신고 실패]`,
                        description: `매니저들을 신고 대상으로 지목하는 경우가 지속적으로 발생하여, 매니저들을 신고 대상으로 지목하실 수 없습니다.\n혹여나 매니저 중, 신고 대상이 존재한다면 ?문의 명령어로 말씀 해주신다면 확인 후 처리 도와드리겠습니다\n\n명령어 사용법 : https://dopamine.gq/FPP/howuse.php`,
                        color: 0xff3c00
                    }
                })
                return;
            }
            if (!rUser)
                return message.author.send({
                    embed: {
                        title: `[FPP CITY 신고 실패]`,
                        description: `신고 대상을 서버에서 찾을 수 없습니다.\n신고 대상의 닉네임과 사유를 매니저분에게 DM 부탁드립니다.`,
                        color: 0xff3c00
                    }
                })
            let rreason = args.join(" ").slice(22);
            if (!rreason) return message.author.send({
                embed: {
                    title: `[FPP CITY 신고 실패]`,
                    description: `신고 사유를 작성해주세요.`,
                    color: 0xff3c00
                }
            })
            client.channels.get("585761109496299521") //warning 채널
                .send({
                    embed: {
                        title: "[ FPP CITY 신고 ]",
                        description: `**신고자**\n닉네임: ${message.author}\n아이디: ${message.author.id}\n\n**대상자**\n닉네임: ${rUser}\n아이디: ${rUser.id}\n지급된 역할: ${member.roles.map(r => `${r}`).join(' | ')}\n\n**신고일**\n${daay}\n\n**사유**\n${rreason}`,
                   color: 0xff3c00,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                    }
                })
                .then(function (message) {
                    message.react('👍')
                    message.react('👎')
                });
            message.author.send({
                embed: {
                    title: "[ FPP CITY 일반 신고 ]",
                    description: `${message.author}님께서 전해주신 ${rUser}님에 대한 신고가 정상적으로 접수되었습니다!`,
                    color: 0xff3c00,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                }
            })
            client.channels.get("675920116776697911")
                .send({
                    embed: {
                        title: "신고 명령어 로그",
                        description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
                        color: 0x81c147,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                    }
                })
        }
    }
}

