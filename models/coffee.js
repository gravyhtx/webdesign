module.exports = function(sequelize, DataTypes) {
  const Coffee = sequelize.define("Coffee", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "Name must be 1-100 characters in length"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    size_oz: {
      type: DataTypes.INTEGER,
      validate: {
        min: 8,
        max: 16
      }
    }
  });
  return Coffee;
};

/*
Coffee
- name
- description
- size_oz

Foreign Keys: (to be created)
roaster_id
type_id
roast_id

^^^
Tables

Roaster
- name
- location by city
- capacity

Type
- single origin or blend
- espresso y/n
- price
*/
