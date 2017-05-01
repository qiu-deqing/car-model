import React from 'react'

import {
  getCarDetail
} from '../services/car'

export default class CarDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      car: {}
    }
  }

  componentDidMount() {
    getCarDetail(this.props.match.params.id)
      .then((data) => {
        this.setState({
          car: data.car
        })
      })
  }

  render() {
    const { car } = this.state
    var peijians = []
    for (var key in car.peijian) {
      peijians.push({
        name: key,
        list: car.peijian[key],
      })
    }

    return (
      <div>
        <div className="row">
          <div className="col-2">品牌</div>
          <div className="col-10">{car.brand}</div>
        </div>
        <div className="row">
          <div className="col-2">制造商</div>
          <div className="col-10">{car.manufacturer}</div>
        </div>
        <div className="row">
          <div className="col-2">车系</div>
          <div className="col-10">{car.series}</div>
        </div>
        <div className="row">
          <div className="col-2">车型</div>
          <div className="col-10">{car.carModel}</div>
        </div>
        <div className="row">
          <div className="col-2">年份</div>
          <div className="col-10">{car.birthYear}</div>
        </div>
        <div className="row">
          <div className="col-2">机油用量</div>
          <div className="col-10">{car.engineOil}</div>
        </div>
        <div className="row">
          <div className="col-2">发动机类型</div>
          <div className="col-10">{car.engineType}</div>
        </div>
        <div className="row">
          <div className="col-2">前轮尺寸</div>
          <div className="col-10">{car.frontTyre}</div>
        </div>
        {peijians.map(peijian => {
          return (
            <div className="row">
              <div className="col-1">{peijian.name}</div>
              <div className="col-11">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>品牌</th>
                      <th>配件模型</th>
                      <th>名字</th>
                      <th>参考价格</th>
                      <th>尺寸</th>
                      <th>属性</th>
                      <th>预览</th>
                    </tr>
                  </thead>
                  <tbody>
                  {peijian.list.map(item => {
                    return (
                      <tr key={item.id}>
                        <td>{item.brand}</td>
                        <td>{item.peijianModel}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.size}</td>
                        <td>{item.peijianProps}</td>
                        <td>
                          <a href={item.imageUrl} target="_blank">图片
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}


      </div>
    )
  }
}