let {
    sequelize,
    Sequelize,
    id, attributes,
    options
} = require('./sequelize')

module.exports = sequelize.define('carPeijian', Object.assign({}, id, {
  carModelId: {
    field: 'car_model_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  peijianId: {
    field: 'peijian_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },

}, attributes), Object.assign({}, options, {
  tableName: 'car_peijian',
}))
