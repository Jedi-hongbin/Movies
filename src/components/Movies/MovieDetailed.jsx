import React, { Component } from 'react'
import { PageHeader } from 'antd'
import style from '@/css/MovieDetailed.scss'
export default class MovieDetailed extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title="Return to list"
        ></PageHeader>
        <div>
          <h3 className={style.h3}>{this.props.title}</h3>
          <img className={style.img} src={this.props.images.large} />
          <span className={style.span}>
            演员：
            {this.props.casts.map((x, i) => (
              <span key={i}> {x.name} </span>
            ))}
          </span>
          <br />
          <span className={style.span}>时长: {this.props.durations[0]}</span>
          <br />
          <span className={style.span}>
            剧情:{this.props.genres.map((x, i) => (
              <span key={i}> {x}</span>
            ))}
          </span>
        </div>
      </div>
    )
  }
}
