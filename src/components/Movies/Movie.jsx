import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { Menu } from 'antd'
import { RocketOutlined, FireOutlined, LikeOutlined } from '@ant-design/icons'

import MovieList from '@/components/Movies/MovieList'
import MovieDetailed from './MovieDetailed'

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: window.location.hash.split('/')[2],
      detailed:[]
    }
  }

  handleClick = (e) => {
    this.setState({
      current: window.location.hash.split('/')[2],
    })
  }

  getDetailed = (obj) => {
    this.setState({
      detailed:obj
    })
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="in_theaters">
            <FireOutlined />
            <Link to="/movie/in_theaters/1" onClick={this.props.chooseTab}>
              影院热播
            </Link>
          </Menu.Item>
          <Menu.Item key="coming_soon">
            <RocketOutlined />
            <Link to="/movie/coming_soon/1" onClick={this.props.chooseTab}>
              即将上映
            </Link>
          </Menu.Item>
          <Menu.Item key="top250">
            <LikeOutlined />
            <Link to="/movie/top250/1" onClick={this.props.chooseTab}>
              史上高分
            </Link>
          </Menu.Item>
        </Menu>
        <Switch>//使用Switch指定如果前面的路由规则优先匹配到了，不进行后面的规则匹配（否则会出现两个路由组件同时展现，出现问题）
          <Route path="/movie/detailed/:id" render={() => (
    <MovieDetailed {...this.state.detailed}></MovieDetailed>)}></Route>
          {/* <Route path="/movie/detailed/:id" component={MovieDetailed} exact></Route> */}
          <Route path="/movie/:type/:page" render={()=>(
            <MovieList getDetailed={this.getDetailed}></MovieList>
          )}></Route>
        </Switch>
      </div>
    )
  }
}
