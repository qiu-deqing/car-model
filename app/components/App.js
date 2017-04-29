import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import CarList from './CarList'
import CarDetail from './CarDetail'

export default class App extends React.Component {


  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" exact component={CarList}/>
            <Route path="/car/:id" component={CarDetail}/>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    )
  }
}