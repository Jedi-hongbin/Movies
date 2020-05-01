import React from 'react'
import { Spin, Pagination } from 'antd'
import fetchJSONP from 'fetch-jsonp'
import style from '@/css/MovieList.scss'

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true, //是否正在加载数据
      movies: [],
      nowPage: Number(window.location.hash.split('/')[3]) || 1, //第几页
      pageSize: 12, //每页显示几条数据
      total: 0, //当前电影分类下共多少条数据
      start: Number(window.location.hash.split('/')[3]) * this.pageSize, //从第几条数据开始请求
      //   type: props.match.params.type,
      type: window.location.hash.split('/')[2],
      display: 'block',
    }
  }

  componentWillMount() {
    this.loadMovieMsg()
  }

  render() {
    return (
      <div className={style.wrap}>
        {this.loading()}
        {this.renderMoviesList()}
      </div>
    )
  }
  loading = () => {
    if (this.state.isLoading) {
      return (
        <Spin
          style={{ display: 'block', margin: '0.6rem auto' }}
          size="large"
          tip="Loading..."
        ></Spin>
      )
    } else {
      return null
    }
  }

  componentWillReceiveProps() {
    this.setState(
      {
        type: window.location.hash.split('/')[2],
        isLoading: true,
        display: 'none',
      },
      () => {
        this.loadMovieMsg()
      }
    )
  }

  loadMovieMsg = () => {
    let url = `https://douban.uieee.com/v2/movie/${this.state.type}?start=${
      (this.state.nowPage - 1) * this.state.pageSize
    }&count=${this.state.pageSize}`

    fetchJSONP(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          isLoading: false,
          movies: res.subjects,
          total: res.total,
          display: 'flex',
        })
      })
      .catch((err) => console.log(err))
  }

  changePage = (currentPage) => {
    this.setState(
      {
        nowPage: currentPage,
        isLoading: true,
        display: 'none',
      },
      () => {
        this.loadMovieMsg()
      }
    )
  }
  renderMoviesList = () => {
    return (
      <div style={{ display: this.state.display }} className={style.wrap}>
        {this.state.movies.map((x, i) => {
          return (
            <div
              onClick={this.movieDetailed.bind(this, x)}
              className={style.container}
              key={i}
            >
              <img src={x.images.large} />
              <h3>
                {x.title} <span>{x.rating.average}</span>{' '}
              </h3>
            </div>
          )
        })}
        <br />
        <Pagination
          defaultCurrent={this.state.nowPage}
          pageSize={this.state.pageSize}
          total={this.state.total}
          onChange={this.changePage}
          className={style.pagination}
        />
      </div>
    )
  }
  movieDetailed = (x) => {
    this.props.getDetailed(x)
    window.location.href = `/#/movie/detailed/${x.id}`
  }
}
