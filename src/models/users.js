import sequelize from '../utils/config.js'
import { DataTypes } from 'sequelize'

const Users = sequelize.define('tb_users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
  },
})

export default Users
