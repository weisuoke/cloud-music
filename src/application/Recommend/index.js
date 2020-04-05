import React, { useEffect } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll/index'
import { forceCheck } from 'react-lazyload'
import { Content } from './style'
import { connect } from 'react-redux'
import * as actionTypes from './store/actionCreators'
import Loading from '../../baseUI/loading'
import { renderRoutes } from 'react-router-config'

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading/> : null}
      {renderRoutes(props.route.routes)}
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  // 不要再这里将数据toJS,不然每次diff比对props的时候都是不一样的引用，还是导致不必要的重渲染, 属于滥用immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend))
