let _ = require('lodash')

module.exports = function() {

    // 辅助生成sequelizejs的json对象
    let sequelizeJson = {
        toJson(serObject) {

            if (_.isPlainObject(serObject)) {
                return _.mapValues(serObject, function(ob) {
                    return sequelizeJson.toJson(ob)
                })
            }

            if (_.isArray(serObject)) {
                return _.map(serObject, function(ob) {
                    return sequelizeJson.toJson(ob)
                })
            }

            if (serObject && /\[object SequelizeInstance/.test(serObject.toString())) {
                return serObject.get({
                    plain: true
                })
            }

            return serObject

        }
    }


    Object.assign(_, sequelizeJson)
}