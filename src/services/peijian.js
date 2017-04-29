let { 
  Peijian,
  Sequelize 
} = require('../models')
var _ = require('lodash')



module.exports = {
  list: async (params) => {
    params = params || {}
    
    var result = await Peijian.findAll({
      attributes: [
        'peijianType',
        'brand',
        'name',
        'imageUrl'
      ],
      offset: 0,
      limit: params.limit || 5,
    })


    return result
  }
}