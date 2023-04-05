import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Comments = sequelize.define('comments', {  
  content: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: true,
      isDate: true
    }
  }
}, {
  timestamps: false
})
