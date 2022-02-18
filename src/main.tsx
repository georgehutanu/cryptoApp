import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import { rootReducer } from './reducers'
import App from './App'


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'))

document.documentElement.style.fontSize = '62.5%'
document.documentElement.style.margin = '0px'
document.documentElement.style.padding = '0px'
document.documentElement.style.boxSizing = 'inherit'
document.body.style.margin = '0px';
document.body.style.boxSizing = "border-box"