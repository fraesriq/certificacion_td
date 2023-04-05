import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Califications = sequelize.define('califications', {
  type: {
    type: DataTypes.INTEGER(2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  timestamps: false
})
