import * as types from '../constants/ActionTypes'
import dispatcher from '../utils/Dispatcher'

export function updateMeteo() {
    fetch('http://localhost:8000/meteo/last', {'mode': 'cors'})
        .then(response => response.json())
        .then(responseObject => {
            dispatcher.dispatch({
                type: types.METEO.UPDATE,
                response: responseObject
            })
        })
        .catch(error => {
            console.error('There is has been a problem during updating meteo data: ' + error.message)
        })
}

export function updateGraph() {
    fetch('http://localhost:8000/graph/lastday', {'mode': 'cors'})
        .then(response => response.json())
        .then(responseObject => {
            dispatcher.dispatch({
                type: types.GRAPH.UPDATE,
                response: responseObject
            })
        })
}