const fs = require('fs');
const usersMap = new Map();
/* 
'id' => {
  messageCount: 0,
  LastMessage: 'message',
  timer: fn()
}
*/
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dopamine2312@@",
  database: "sunam_test",
});
module.exports = async (client, message) => {
  if (message.content) { // 욕설 필터링 시작
    let messege = message.content.toString();
    var abuse = fs.readFileSync("./abuse.json");
    abuse = JSON.parse(abuse);
    var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"1234567890]/gi
    if (regExp.test(messege)) { //필터링 시작
      var t = messege.replace(regExp, "")
      for (i of abuse) {
        if (t.indexOf(i) != -1) {
          if (message.channel.id == "424791216736174081") return; //team-hunting 채널
          if (message.channel.id == "585760084416659466") return; //bot-order 채널
          if (message.channel.id == "399642680810012672") return; //music-bot 채널
          if (message.channel.id == "447330180361486336") return; //inventory 채널
          if (message.author.id == "370542993457020940") return; //ExyV
          if (message.author.id == "629595118399389696") return; //울브
          if (message.author.id == "610826604960022569") return; //울브님 본계
          if (message.author.id == "382786660301012992") return; //DK
          if (message.author.id == "365422093443137537") return; //에이치지니       
          message.delete();
          client.channels.get("617739758780809283")
            .send({
              embed: {
                title: "[ 욕설 필터링 ]",
                description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}||]\n\n채널 : ${message.channel}`,
                color: 0xff3c00,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
          message.author.send({
            embed: {
              title: `[ FPP CITY ]`,
              description: `욕설이 감지되어 필터링이 작동하였습니다!\n\n필터링 단어 : [||${i}||]\n문장  : [||${messege}||]`,
              color: 0xff3c00,
              footer: {
                icon_url: client.user.avatarURL,
                text: `Copyright 2018~.Dopamine.All rights reserved.`
              }
            }
          });
          client.channels.get("683863232540442650")
            .send({
              embed: {
                title: "욕설 로그",
                description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}}||]\n\n채널 : ${message.channel}`,
                color: 0xff3c00,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
        }
      }
      if (usersMap.has(message.author.id)) {   //Muted 지급 코드
        const userData = usersMap.get(message.author.id);
        let messageCount = userData.messageCount;
        ++messageCount;
        if (parseInt(messageCount) === 2) {
          for (i of abuse) {
            if (t.indexOf(i) != -1) {
              if (message.channel.id == "424791216736174081") return; //team-hunting 채널
              if (message.channel.id == "585760084416659466") return; //bot-order 채널
              if (message.channel.id == "399642680810012672") return; //music-bot 채널
              if (message.channel.id == "447330180361486336") return; //inventory 채널
              if (message.author.id == "370542993457020940") return; //ExyV
              if (message.author.id == "629595118399389696") return; //울브
              if (message.author.id == "610826604960022569") return; //울브님 본계
              if (message.author.id == "382786660301012992") return; //DK
              if (message.author.id == "365422093443137537") return; //에이치지니
              let role = message.guild.roles.find(r => r.name === "Muted");
              message.member.addRole(role);
              message.channel.send({
                embed: {
                  title: `[ FPP CITY ]`,
                  description: `<@${message.author.id}>님께서 지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.`,
                  color: 0xff3c00,
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: `Copyright 2018~.Dopamine.All rights reserved.`
                  }
                }
              });
              var log = "INSERT INTO discord_black_list (id) VALUES ?";
              var values = [
                [`${message.author.id}`]
              ];
              connection.query(log, [values], function (err, result) {
              })
              setTimeout(function () {
                message.author.send({
                  embed: {
                    title: `[ FPP CITY ]`,
                    description: `지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.\n채팅 차단 해제 문의는 <#585760084416659466> 채널에서 "?문의 내용" 명령어를 이용해주세요.\n확인 후, 처리 도와드리겠습니다.`,
                    color: 0xff3c00,
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: `Copyright 2018~.Dopamine.All rights reserved.`
                    }
                  }
                });
              }, 1500)
            }
          }
        } else {
          userData.messageCount = messageCount;
          usersMap.set(message.author.id, userData);
        }
      }
      else {
        usersMap.set(message.author.id, {
          messageCount: 1,
          lastMessage: message,
          timer: null
        });
        setTimeout(() => {
          usersMap.delete(message.author.id);
        }, 2000);
      }
    } else { //또는 특수문자가 없으면
      for (i of abuse) {
        if (message.content.indexOf(i) != -1) {
          if (message.channel.id == "424791216736174081") return; //team-hunting 채널
          if (message.channel.id == "585760084416659466") return; //bot-order 채널
          if (message.channel.id == "399642680810012672") return; //music-bot 채널
          if (message.channel.id == "447330180361486336") return; //inventory 채널
          if (message.author.id == "370542993457020940") return; //ExyV
          if (message.author.id == "629595118399389696") return; //울브
          if (message.author.id == "610826604960022569") return; //울브님 본계
          if (message.author.id == "382786660301012992") return; //DK
          if (message.author.id == "365422093443137537") return; //에이치지니      
          message.delete();
          client.channels.get("617739758780809283")
            .send({
              embed: {
                title: "[ 욕설 필터링 ]",
                description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}||]\n\n채널 : ${message.channel}`,
                color: 0xff3c00,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
          message.author.send({
            embed: {
              title: `[ FPP CITY ]`,
              description: `욕설이 감지되어 필터링이 작동하였습니다!\n\n필터링 단어 : [||${i}||]\n문장  : [||${messege}||]`,
              color: 0xff3c00,
              footer: {
                icon_url: client.user.avatarURL,
                text: `Copyright 2018~.Dopamine.All rights reserved.`
              }
            }
          });
          client.channels.get("683863232540442650")
            .send({
              embed: {
                title: "욕설 로그",
                description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}||]\n\n채널 : ${message.channel}`,
                color: 0xff3c00,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
        }
      }
      if (usersMap.has(message.author.id)) {   //Muted 지급 코드
        const userData = usersMap.get(message.author.id);
        let messageCount = userData.messageCount;
        ++messageCount;
        if (parseInt(messageCount) === 2) {
          for (i of abuse) {
            if (message.content.indexOf(i) != -1) {
              if (message.channel.id == "424791216736174081") return; //team-hunting 채널
              if (message.channel.id == "585760084416659466") return; //bot-order 채널
              if (message.channel.id == "399642680810012672") return; //music-bot 채널
              if (message.channel.id == "447330180361486336") return; //inventory 채널
              if (message.author.id == "370542993457020940") return; //ExyV
              if (message.author.id == "629595118399389696") return; //울브
              if (message.author.id == "610826604960022569") return; //울브님 본계
              if (message.author.id == "382786660301012992") return; //DK
              if (message.author.id == "365422093443137537") return; //에이치지니     
              message.delete();
              let role = message.guild.roles.find(r => r.name === "Muted");
              message.member.addRole(role);
              message.channel.send({
                embed: {
                  title: `[ FPP CITY ]`,
                  description: `<@${message.author.id}>님께서 지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.`,
                  color: 0xff3c00,
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: `Copyright 2018~.Dopamine.All rights reserved.`
                  }
                }
              });
              var log = "INSERT INTO discord_black_list (id) VALUES ?";
              var values = [
                [`${message.author.id}`]
              ];
              connection.query(log, [values], function (err, result) {
              })
              setTimeout(function () {
                message.author.send({
                  embed: {
                    title: `[ FPP CITY ]`,
                    description: `지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.\n채팅 차단 해제 문의는 <#585760084416659466> 채널에서 "?문의 내용" 명령어를 이용해주세요.\n확인 후, 처리 도와드리겠습니다.`,
                    color: 0xff3c00,
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: `Copyright 2018~.Dopamine.All rights reserved.`
                    }
                  }
                });
              }, 1500)
            }
          }
        } else {
          userData.messageCount = messageCount;
          usersMap.set(message.author.id, userData);
        }
      }
      else {
        usersMap.set(message.author.id, {
          messageCount: 1,
          lastMessage: message,
          timer: null
        });
        setTimeout(() => {
          usersMap.delete(message.author.id);
        }, 2000);
      }
    }
  }

  if (message.channel.id === `520152509504028682`) {  //free-chat내에 링크 제거
    let messege = message.content.toString();
    if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) {
      message.delete()
      message.author.send({
        embed: {
          title: `[ FPP CITY ]`,
          description: `<#520152509504028682> 채널 내에 디스코드 초대 링크를 보내실 수 없습니다.`,
          color: 0xff3c00,
          footer: {
            icon_url: client.user.avatarURL,
            text: `Copyright 2018~.Dopamine.All rights reserved.`
          }
        }
      });
      client.channels.get("759315495475478548")
        .send({
          embed: {
            title: "프리챗 링크 제거 로그",
            description: `기재자 : ${message.author}\n아이디 : ${message.author.id}\n내용  : ${messege}`,
            color: 0xff3c00,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        }).then(function (message) {
          message.react('🆗')
          message.react('❌')
        });
    }
  }

  if (message.channel.id === `424791216736174081`) {  //team-hunting내에 링크 제거
    let messege = message.content.toString();
    if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) {
      message.delete()
      message.author.send({
        embed: {
          title: `[ FPP CITY ]`,
          description: `<#424791216736174081> 채널 내에 디스코드 초대 링크를 보내실 수 없습니다.`,
          color: 0xff3c00,
          footer: {
            icon_url: client.user.avatarURL,
            text: `Copyright 2018~.Dopamine.All rights reserved.`
          }
        }
      });
      client.channels.get("759315495475478548")
        .send({
          embed: {
            title: "팀헌팅 링크 제거 로그",
            description: `기재자 : ${message.author}\n아이디 : ${message.author.id}\n내용  : ${messege}`,
            color: 0xff3c00,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        }).then(function (message) {
          message.react('🆗')
          message.react('❌')
        });
    }
  }

  if (message.channel.id === `417898454937763841`) {
    let messege = message.content.toString();
    if (message.content.includes('youtube.com/watch?')) {
      message.delete()
      message.author.send({
        embed: {
          title: `[ FPP CITY ]`,
          description: `<#417898454937763841> 채널 내에 영상을 기재하실 수 없습니다.`,
          color: 0xff3c00,
          footer: {
            icon_url: client.user.avatarURL,
            text: `Copyright 2018~.Dopamine.All rights reserved.`
          }
        }
      });
      client.channels.get("759315495475478548")
        .send({
          embed: {
            title: "스트리머 영상 제거 로그",
            description: `기재자 : ${message.author}\n아이디 : ${message.author.id}\n내용  : ${messege}`,
            color: 0xff3c00,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        }).then(function (message) {
          message.react('🆗')
          message.react('❌')
        });
    }
  }

  if (message.channel.id === `585760084416659466`) {  //마스터 신청 양식 미준수시 
    let messege = message.content.toString();
    if (message.content.includes('마스터 신청')) {
      message.delete()
      message.author.send({
        embed: {
          title: `[ FPP CITY ]`,
          description: `마스터 신청 양식이 올바르지 않아, 정상적으로 접수되지 않았습니다.\n<#585760084416659466> 채널에 기재되어 있는 양식에 맞추어 재신청 부탁드립니다.`,
          color: 0xff3c00,
          footer: {
            icon_url: client.user.avatarURL,
            text: `Copyright 2018~.Dopamine.All rights reserved.`
          }
        }
      });
    }
  }

  if (message.channel.id === `585760084416659466`) {
    if (!message.content.includes('?')) {
      message.delete()
      let messege = message.content.toString();
      message.author.send({
        embed: {
          title: "[FPP CITY]",
          description: `명령어 양식이 올바르지 않아 접수되지 않았습니다.\n<#585760084416659466>의 상단에 있는 양식들 혹은 https://dopamine.gq/FPP/howuse.php 를 참고하셔서 재신고 부탁드립니다.\n\n삭제된 내용: ${messege}`,
          color: 0xff3c00,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
        }
      })
    }
  }


};
