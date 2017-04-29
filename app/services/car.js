import { get, post } from '../utils/api'

export function getCarList(params) {
  return get('/api/car/list', {
    params,
  })
}

export function getCarDetail(id) {
  return get('/api/car/detail', {
    params: {
      id,
    }
  })
}
