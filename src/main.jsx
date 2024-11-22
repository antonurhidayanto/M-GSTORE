import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux'
import { reducers } from './store/store.js'

const globalStore = legacy_createStore(reducers)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={globalStore}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  </Provider>
)