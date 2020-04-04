//App.js
import React from 'react'
import { Provider } from 'react-redux'
import { IconStyle } from './assets/iconfont/iconfont'
import { GlobalStyle } from './style'
import { renderRoutes } from 'react-router-config'
import store from './store/index'
import routes from './routes/index'
import { HashRouter } from 'react-router-dom'
import { Data } from './application/Singers/data'

function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle/>
        <IconStyle/>
        <Data>
          {renderRoutes(routes)}
        </Data>
      </HashRouter>
    </Provider>
  )
}

export default App
