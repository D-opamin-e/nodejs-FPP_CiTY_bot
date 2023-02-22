var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "비번!",
  database: "sunam_test",
});
module.exports = async (guildMemberRemove, member) => {
    connection.query(`DELETE FROM discord_warning_all WHERE id="${member.id}"`, function (err, result, fields) { //삭제 시작
      if (err) throw err;
  });
}
