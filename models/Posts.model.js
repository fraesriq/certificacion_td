import { DataTypes } from 'sequelize'
import { sequelize } from '../db/db.js'

export const Posts = sequelize.define('posts', {
  title: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: DataTypes.STRING(4000),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date_post: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  imagen: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
})
