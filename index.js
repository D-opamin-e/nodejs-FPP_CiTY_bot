/*
Copyright 2018~.Dopamine.All rights reserved
 Ｃｏｐｙｒｉｇｈｔ  ２０１８~．Ｄｏｐａｍｉｎｅ．Ａｌｌ ｒｉｇｈｔｓ ｒｅｓｅｒｖｅｄ．
 Dopamine#6657에게 모든 저작권이 존재하며 아래 하단의 소스들을 무단으로 수정 및 이용, 공유를 할 경우
 법적 처벌을 받으실 수 있습니다.
*/
const { Client, Collection, Discord } = require("discord.js");
const { config } = require("dotenv");
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
const fs = require('fs');
client.categories = fs.readdirSync(`./commands/`);
config({
  path: __dirname + "/.env"
});
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
const schedule = require('node-schedule');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : "localhost",
  port : 3306,
  user : "root",
  password : "비번!",
  database : "sunam_test",
});
var date = new Date();

fs.readdir(__dirname + "/client/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/client/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.on('ready', () => {

  console.log(`FPP City 활성화 되었습니다.` + new Date());
  console.log(`※ Copyright 2018~.Dopamine.All rights reserved. ※`);
  client.user.setActivity('명령어 >> #bot-order');

  setInterval(() => {
    client.user.setActivity('문의 >> #bot-order');
    setTimeout(function() {
      client.user.setActivity('신고 >> #bot-order');
    }, 5000)
    setTimeout(function() {
      client.user.setActivity('마스터신청 >> #bot-order');
    }, 10000)
    }, 15000);

  
  var reboot = schedule.scheduleJob('01 00 00 * * *', function(){
    console.log(`봇 자동 재시작`)
      client.user.setActivity('자동 재시작');
     process.exit(1);
    })
    
  var warning = schedule.scheduleJob('50 00 00 * * *', function(){  // 50 00 00 
    var tooday = (1 + date.getMonth() + '/' + date.getDate());
    connection.query(`SELECT * FROM discord_warning_all WHERE fin_day="${tooday}"`, function (err, result, fields) {
      if (err) throw err;
      for(var f = 0; f < result.length; f++) {
        let rname = `${result[f].state}`
        let meember = `${result[f].id}`;
        var membeer = client.guilds.get("370594167770054663").members.get(`${meember}`); 
        let role = client.guilds.get("370594167770054663").roles.find(r => r.name === `${rname}`);
        membeer.removeRole(role).then(() => {
          client.channels.get(`441099080194588682`)
          .send({ embed: {
            title : `[ 경고 역할 자동 삭감 ]`,
            description: `삭감 대상자 : <@${meember}>\n아이디 : ||${meember}||\n삭감 역할 : ${rname}`,
                  color: 0x48FF00
          }});
            })
       }
    })
    connection.query(`DELETE FROM discord_warning_all WHERE fin_day="${tooday}"`, function (err, result, fields) { //삭제 시작
      if (err) throw err;
  });
});
});

client.on('message', async message => {
  const prefix = "?";
  if(message.author.bot) return;
  if(message.channel.type === "dm"){
   message.author.send({ embed: {
        title : `[ FPP CITY ]`,
        description: `개인 DM으로는 이용이 불가합니다.\n<#585760084416659466> 채널에서 양식에 맞게 명령어 이용 부탁드립니다.`,
                color: 0xff3c00,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `Copyright 2018~.Dopamine.All rights reserved.`
                }
             }}); return;
    }

  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) return;
  
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) 
      command.run(client, message, args);

    });
    // client.login(`NTg0NTk5MDE0NzEyODAzMzI5.XPNQQg.mUz3EoiZA7xKjpzuAWpkRxidPPU`);
    client.login("NzI2NDA5MTAxMTcyNTM5NDMz.Xvc3MQ.0oZO81SQQSevLFkeRd9OZaZ4Hyk");
