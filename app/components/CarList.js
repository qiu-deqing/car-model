import React from 'react'

import {
  getCarList
} from '../services/car'

import Pagination from 'rc-pagination'
import Select from 'rc-select'


export default class CarList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: {
        initial: '',
        brand: '',
        manufacturer: '',
        series: '',
        carModel: '',
        engineOil: '',
        engineType: '',
      },
      carList: [],
      pager: {
        toPage: 1,
        perPageSize: 10,
        total: 0,
      }
    }
  }

  updateQuery = (fieldName, value) => {
    this.setState({
      query: {
        [fieldName]: value,
      }
    })
  }

  queryCarList(resetPager) {
    var { query, pager } = this.state
    if (resetPager) {
      pager = {
        toPage: 1,
        perPageSize: 10
      }
    }
    getCarList(Object.assign({}, query, pager))
      .then((data) => {
        this.setState({
          pager: {
            total: data.count,
          },
          carList: data.rows,
        })
        console.log(data)
      })
    this.setState({
      pager,
    })
  }

  updatePager = (toPage, perPageSize) => {
    this.setState({
      pager: {
        toPage,
        perPageSize
      }
    }, () => {
      this.queryCarList()
    })
  }

  componentDidMount() {
    this.queryCarList()
  }

  render() {
    const { query, carList, pager } = this.state
    return (
      <div>
        <form className="form-inline"
          onSubmit={e => {
            e.preventDefault()
            this.queryCarList(true)
          }}
        >
          <div className="form-group mx-sm-3">
            <input className="form-control" 
              value={query.initial} 
              onChange={e => {
                this.updateQuery('initial', e.target.value)
              }} 
              placeholder="首字母" 
            />
          </div>
          <div className="form-group mx-sm-3">
            <input className="form-control" 
              value={query.brand}
              onChange={e => {
                this.updateQuery('brand', e.target.value)
              }}
              placeholder="品牌" 
            />
          </div>
          <div className="form-group mx-sm-3">
            <input className="form-control"
              value={query.manufacturer}
              onChange={e => {
                this.updateQuery('manufacturer', e.target.value)
              }}
              placeholder="制造商" 
            />
          </div>
          <div className="form-group mx-sm-3">
            <input className="form-control"
              value={query.series}
              onChange={e => {
                this.updateQuery('series', e.target.value)
              }}
              placeholder="车系" 
            />
          </div>
          <div className="form-group mx-sm-3">
            <input className="form-control"
              value={query.carModel}
              onChange={e => {
                this.updateQuery('carModel', e.target.value)
              }}
              placeholder="车型" 
            />
          </div>
          <div className="form-group mx-sm-3">
            <input className="form-control"
              value={query.engineOil}
              onChange={e => {
                this.updateQuery('engineOil', e.target.value)
              }}
              placeholder="机油" 
            />
          </div>
          <div className="form-group mx-sm-3">
            <input className="form-control"
              value={query.engineType}
              onChange={e => {
                this.updateQuery('engineType', e.target.value)
              }}
              placeholder="发动机类型" 
            />
          </div>          
          <div className="form-group mx-sm-3">
            <button type="submit" className="btn btn-primary">查询</button>
          </div>
          
        </form>

        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>首字母</th>
                <th>品牌</th>
                <th>厂商</th>
                <th>车系</th>
                <th>车型</th>
                <th>年份</th>
                <th>机油用量</th>
                <th>发动机类型</th>
                <th>前轮尺寸</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {carList.map(car => {
                return (
                  <tr key={car.id}>
                    <td>{car.initial}</td>
                    <td>{car.brand}</td>
                    <td>{car.manufacturer}</td>
                    <td>{car.series}</td>
                    <td>{car.carModel}</td>
                    <td>{car.birthYear}</td>
                    <td>{car.engineOil}</td>
                    <td>{car.engineType}</td>
                    <td>{car.frontTyre}</td>
                    <td>
                      <a href={`#/car/${car.id}`} target="_blank">查看配件</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div>
            <Pagination
              showQuickJumper
              showSizeChanger
              pageSizeOptions={['10', '20', '50', '100', '200']}
              selectComponentClass={Select}
              defaultPageSize={pager.perPageSize}
              defaultCurrent={pager.toPage}
              total={pager.total}
              onShowSizeChange={this.updatePager}
              onChange={this.updatePager}
            />

          </div>
        </div>
      </div>
    )
  }
}