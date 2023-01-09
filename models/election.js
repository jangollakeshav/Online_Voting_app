"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Election extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static addElections({ electionName, adminID, publicurl }) {
      return this.create({
        electionName,
        publicurl,
        adminID,
      });
    }
    static getPublicurl(publicurl) {
      return this.findOne({
        where: {
          publicurl,
        },
      });
    }
    static getElectionurl(publicurl) {
      return this.findOne({
        where: {
          publicurl,
        },
        order: [["id", "ASC"]],
      });
    }

    static getElection(adminID) {
      return this.findOne({
        where: {
          adminID,
        },
        order: [["id", "ASC"]],
      });
    }
    static getElections(adminID) {
      return this.findAll({
        where: {
          adminID,
        },
        order: [["id", "ASC"]],
      });
    }

    static launch(id) {
      return this.update(
        {
          launched: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    static end(id) {
      return this.Election.update(
        {
          ended: true,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }

    static associate(models) {
      // define association here
      Election.belongsTo(models.Admin, {
        foreignKey: "adminID",
      });
      Election.hasMany(models.questions, {
        foreignKey: "electionID",
      });
      Election.hasMany(models.Voters, {
        foreignKey: "electionID",
      });
    }
  }
  Election.init(
    {
      electionName: DataTypes.STRING,
      launched: DataTypes.BOOLEAN,
      ended: DataTypes.BOOLEAN,
      publicurl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Election",
    }
  );
  return Election;
};
