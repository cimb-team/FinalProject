import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'


console.disableYellowBox = true;

const store = createStore(reducer, applyMiddleware(thunk))

export default store