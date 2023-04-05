import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Categories = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
})
