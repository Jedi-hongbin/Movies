import React from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'

import Home from '@/components/Home/Home'
import Movie from '@/components/Movies/Movie'
import About from '@/components/About/About'

import style from '@/css/App.scss'

import { Layout, Menu, Breadcrumb } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bread:[window.location.hash.split('/')[1]]
    }
  }

  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  componentWillMount(){
  }

  render() {
    return (
      <HashRouter>
        <Layout style={{ height: '100%' }}>
          <Sider reverseArrow="true" trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className={style.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.hash.split('/')[1] || "home"}>
              <Menu.Item key="home">
                <MenuOutlined />
                <span><Link to="/home" onClick={this.chooseTab}>Home</Link></span>
              </Menu.Item>
              <Menu.Item key="movie">
                <VideoCameraOutlined />
                <span><Link to="/movie/in_theaters/1" onClick={this.chooseTab}>Movie</Link></span>
              </Menu.Item>
              <Menu.Item key="about">
                <UserOutlined />
                <span><Link to="/about" onClick={this.chooseTab}>About</Link></span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: 0, color: '#fff' }}
            >
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                }
              )}
              <Breadcrumb separator="🛫" style={{ display:"inline-block",margin: '16px',color: '#fff' }}>
                {this.state.bread.map((x,i) => <Breadcrumb.Item key={i}>{x}</Breadcrumb.Item>)}
              </Breadcrumb>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '0',
                padding: 0,
                minHeight: 280,
              }}
            >
              <Route path="/home" component={Home}></Route>
              <Route path="/movie" render={() => (
    <Movie chooseTab={this.chooseTab}></Movie>)}></Route>
              {/* <Route path="/movie" component={Movie}></Route> */}
              <Route path="/about" component={About}></Route>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
  chooseTab = () => {
    setTimeout(()=>{
      let breadArr = []
      for(let x of window.location.hash.split('/')){
        if(x == "#"){
          continue
        }else{
          if(!isNaN(x)){
            break
          }
          if(x == "in_theaters"){
            breadArr.push("影院热播")
          }else if(x == "coming_soon"){
            breadArr.push("即将上映")
          }else if(x == "top250"){
            breadArr.push("史上高分")
          }else{
            breadArr.push(x)
          }
        }
      }
      this.setState({
        bread:breadArr
      })
    },0)
  }
}


