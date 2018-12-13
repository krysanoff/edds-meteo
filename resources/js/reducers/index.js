import { combineReducers } from 'redux'
import meteo from './Meteo'
import graph from './Graph'

const rootReducer = combineReducers({
    meteo,
    graph
})

export default rootReducer