import Sequelize from 'sequelize'
import fs from 'fs-extra'
import path from 'path'

var dataDirPath = path.join(__dirname, '../../../', 'data')

fs.ensureDirSync(dataDirPath)

var options = {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  storage: path.join(dataDirPath, 'data.sqlite')
}

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, options)

export default sequelize
