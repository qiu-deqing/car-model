let { 
  Car,
  CarPeijian,
  Peijian,
  Sequelize ,
} = require('../models')
let { exclude } = require('../models/sequelize')

var _ = require('lodash')


module.exports = {
  /**
   * @param params.toPage 第几页,从1开始
   * @param params.perPageSize 每页大小
   */
  list: async (params) => {
    var query = {}

    if (params.initial) {
      query.initial = params.initial
    }
    if (params.brand) {
      query.brand = {
        $like: `%${params.brand}%`
      }
    }
    if (params.manufacturer) {
      query.manufacturer = {
        $like: `%${params.manufacturer}%`
      }
    }
    if (params.series) {
      query.series = {
        $like: `%${params.series}%`
      }
    }


    if (params.carModel) {
      query.carModel = {
        $like: `%${params.carModel}%`
      }
    }
    if (params.birthYear) {
      query.birthYear = {
        $like: `%${params.birthYear}%`
      }
    }
    if (params.engineOil) {
      query.engineOil = {
        $like: `%${params.engineOil}%`
      }
    }
    if (params.engineType) {
      query.engineType = {
        $like: `%${params.engineType}%`
      }
    }
    
    var result = await Car.findAndCount({
      attributes: { 
        exclude,
      },
      where: query,
      offset: (params.toPage - 1) * params.perPageSize,
      limit: params.perPageSize,
      order: [['id', 'desc']],
    })

    return result
  },


  detail: async (carModelId) => {
    var peijianIds = await CarPeijian.findAll({
      attributes: [
        'peijianId'
      ],
      where: {
        carModelId: carModelId
      }
    })


    
    peijianIds = _.toJson(peijianIds)
    peijianIds = _.map(peijianIds, 'peijianId')

    var carPromise = Car.findOne({
      attributes: {
        exclude,
      },
      where: {
        carModelId: carModelId,
      }
    })

    var peijiansPromise = Peijian.findAll({
      attributes: {
        exclude,
      },
      where: {
        peijianId: {
          in: peijianIds,
        }
      }
    })

    var result = await Promise.all([peijiansPromise, carPromise])
    result = _.toJson(result)
    
    var car = result[1]
    var peijianMap = _.groupBy(result[0], 'peijianType')
    var peijians = []
    for (var key in peijianMap) {
      peijians.push({
        name: key,
        list: peijianMap[key],
      })
    }

    var orderMap = {
      '汽油滤清器': 10,  // 数据库没有
      '机油滤清器': 9,
      '空气滤清器': 8,
      '空调滤清器': 7,
      '火花塞': 6,
      '前刹车片': 5,
      '后刹车片': 4,
    }

    peijians.sort((a, b) => {
      var aOrder = orderMap[a.name] || 0
      var bOrder = orderMap[b.name] || 0
      return bOrder - aOrder
    })

    car.peijians = peijians
    return car
  }
}