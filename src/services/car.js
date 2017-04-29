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


  detail: async (id) => {
    var peijianIds = await CarPeijian.findAll({
      attributes: [
        'peijianId'
      ],
      where: {
        carModelId: id
      }
    })
    console.log(peijianIds.length)
    
    peijianIds = _.toJson(peijianIds)
    peijianIds = _.map(peijianIds, 'peijianId')

    var carPromise = Car.findOne({
      attributes: {
        exclude,
      },
      where: {
        id,
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
    car.peijian = _.groupBy(result[0], 'peijianType')

    result[0].forEach(item => {
      console.log(item.peijianType)
    })

    return car
  }
}