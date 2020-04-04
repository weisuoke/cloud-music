import React, { useState } from 'react'
import Horizen from '../../baseUI/horizon-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './styles'

function Singers (props) {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }

  let handleUpdateCatetory = (val) => {
    setCategory(val)
  }

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={'分类 (默认热门):'}
        handleClick={handleUpdateCatetory}
        oldVal={category}/>
      <Horizen
        list={alphaTypes}
        title={'首字母:'}
        handleClick={val => handleUpdateAlpha(val)}
        oldVal={alpha}/>
    </NavContainer>
  )
}

export default React.memo(Singers)
