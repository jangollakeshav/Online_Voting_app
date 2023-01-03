"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Voters.belongsTo(models.Election, {
        foreignKey: "electionID",
      });
    }
    static add(voterid, password, electionID) {
      return this.create({
        voterid: voterid,
        voted: false,
        password: password,
        electionID: electionID,
      });
    }

    static editpassword(voterid, password) {
      return this.update(
        {
          password: password,
        },
        {
          where: {
            voterid: voterid,
          },
        }
      );
    }

    static getvoters(electionID) {
      return this.findAll({
        where: {
          electionID,
        },
      });
    }
    static countvoters(electionID) {
      return this.count({
        where: {
          electionID,
        },
      });
    }

    static delete(voterID) {
      return this.destroy({
        where: {
          id: voterID,
        },
      });
    }
  }
  Voters.init(
    {
      voterid: DataTypes.STRING,
      voted: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      case: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Voters",
    }
  );
  return Voters;
};
