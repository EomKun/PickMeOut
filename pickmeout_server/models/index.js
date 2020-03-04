const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./users')(sequelize,Sequelize);
db.UserInfo = require("./userinfo")(sequelize, Sequelize);
db.Posts = require('./posts')(sequelize,Sequelize);

// model을 만들때 자동으로 id값을 생성함
// 그리고 이 밑에서 테이블간의 관계를 자동으로 지정함
// 관계를 알아서 설정해 줌

// 1 : 1
db.UserInfo.hasOne(db.Users, { foreignKey: 'userinfo_id' });   

// 1 : n
db.Users.hasMany(db.Posts);
db.UserInfo.hasMany(db.Posts);    

// n : m
db.Users.belongsToMany(db.Posts, {
  foreignKey: "u_id",
  through: "heart",    // table 명
});
db.Posts.belongsToMany(db.Users, {
  foreignKey: "p_id",
  through: "heart",
});

module.exports = db;
