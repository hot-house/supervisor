import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

const Extract = sequelize.define('extract', {
    temperature: { type: Sequelize.FLOAT },
    luminosity: { type: Sequelize.INTEGER }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
})

Extract.sync({ force: false })

export default Extract
