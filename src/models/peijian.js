let {
    sequelize,
    Sequelize,
    id, attributes,
    options
} = require('./sequelize')

module.exports = sequelize.define('peijian', Object.assign({}, id, {
  peijianId: {
    field: 'peijian_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  peijianType: {
    field: 'peijian_type',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  peijianTypeId: {
    field: 'peijian_type_id',
    type: Sequelize.STRING,
    comment: '接口名称'
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
  peijianModel: {
    field: 'peijian_model',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  peijianModelId: {
    field: 'peijian_model_id',
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  name: {
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  price: {
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  size: {
    type: Sequelize.STRING,
    comment: '接口名称'
  },
  imageUrl: {
    field: 'image_url',
    type: Sequelize.STRING,
    comment: '接口名称'
  },

}, attributes), options)
