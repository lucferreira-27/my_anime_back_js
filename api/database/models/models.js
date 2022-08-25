const { Sequelize } = require("sequelize");
const db = require('../db')

const Back =  db.define("back", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  start_date:{
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date:{
    type: Sequelize.DATE,
    allowNull: false,
  },

},{
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

const Title = db.define("title", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  mal_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  members: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  score: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  score_users:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ranked:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  popularity:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  favorites:{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  image_url:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  mal_url:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  type:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  media_type:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  start_year:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  start_date:{
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date:{
    type: Sequelize.DATE,
    allowNull: true,
  },
  end_year:{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  start_year:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status:{
    type: Sequelize.STRING,
    allowNull: false,
  },
},{
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});

const Rate = db.define("rate", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  
  members_rate: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  score_rate: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  ranked_position_rate:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  popularity_position_rate:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  favorites_rate:{
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
},{
  timestamps: false,
  createdAt: false,
  updatedAt: false,
});


Back.Rate = Back.hasOne(Rate),
Rate.Back = Rate.belongsTo(Back),
Back.Title = Back.hasOne(Title),
Title.Back =  Title.belongsTo(Back)

module.exports = {Back,Title, Rate}