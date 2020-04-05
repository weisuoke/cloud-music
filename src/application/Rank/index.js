import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store/index'
import Loading from '../../baseUI/loading'
import {
  List,
  ListItem,
  SongList,
  Container
} from './styles'
import Scroll from '../../baseUI/scroll/index'
import { EnterLoading } from './../Singers/style'
import { filterIndex, filterIdx } from '../../api/utils'
import { renderRoutes } from 'react-router-config'

function Rank (props) {
  const { rankList: list, loading } = props

  const { getRankListDataDispatch } = props

  let rankList = list ? list.toJS() : []

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch()
    }
    // eslint-disable-next-line
  }, [])

  console.log('🆚 rankList', rankList)
  let globalStartIndex = filterIndex(rankList)
  let officialList = rankList.slice(0, globalStartIndex)
  let globalList = rankList.slice(globalStartIndex)

  const enterDetail = (name) => {
    const idx = filterIdx(name)
    if (idx === null) {
      alert('暂无相关数据')
      return
    }
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.name)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  let displayStyle = loading ? { 'display': 'none' } : { 'display': '' }
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
})
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch(getRankList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))