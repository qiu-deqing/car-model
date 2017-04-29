var Sequelize = require('sequelize')
var config = require('../config')

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  pool: config.db.pool
})
sequelize.authenticate()
  .then((/* err */) => {
    // console.log('Connection has been established successfully.');
    console.log('----------------------------------------')
    console.log('DATABASE √')
    console.log('    HOST     %s', config.db.host)
    console.log('    PORT     %s', config.db.port)
    console.log('    DATABASE %s', config.db.database)
    console.log('----------------------------------------')
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err)
  })

module.exports = {
  sequelize,
  Sequelize,
  id: {
    id: { type: Sequelize.BIGINT(11), primaryKey: true, allowNull: false, autoIncrement: true }
  },
  attributes: {
    create_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW, comment: '创建时间' },
    update_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW, comment: '更新时间' },
    delete_date: { type: Sequelize.DATE, allowNull: true, comment: '删除时间' },
    reserve: { type: Sequelize.STRING, allowNull: true, comment: '备用' }
  },
  options: {
    freezeTableName: true,
    createdAt: 'create_date',
    updatedAt: 'update_date',
    deletedAt: 'delete_date',
    paranoid: false
  },
  exclude: ['password', 'create_date', 'update_date', 'delete_date', 'reserve']
}
