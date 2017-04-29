let {
    sequelize,
    Sequelize,
    id, attributes,
    options
} = require('./sequelize')

module.exports = sequelize.define('Car', Object.assign({}, id, {
  initial: {
    field: 'initial',
    type: Sequelize.STRING,
    comment: '首字母'
  },
  brand: {
    field: 'brand',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  brandId: {
    field: 'brand_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  manufacturer: {
    field: 'manufacturer',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  manufacturerId: {
    field: 'manufacturer_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  series: {
    field: 'series',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  seriesId: {
    field: 'series_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  birthYear: {
    field: 'birth_year',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  carModel: {
    field: 'car_model',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  carModelId: {
    field: 'car_model_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  engineOil: {
    field: 'engine_oil',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  engineType: {
    field: 'engine_type',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  frontTyre: {
    field: 'front_tyre',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
}, attributes), Object.assign({}, options, {
  tableName: 'car_model',
}))
