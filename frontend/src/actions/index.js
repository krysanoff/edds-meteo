import * as types from '../constants/ActionTypes'
import dispatcher from '../utils/Dispatcher'

export const METEO = {
    UPDATE: 'updateMeteo'
}

export function updateMeteo() {
    fetch('http://localhost:8000/meteo/last', {'mode': 'cors'})
        .then(response => response.json())
        .then(responseObject => {
            dispatcher.dispatch({
                type: METEO.UPDATE,
                response: responseObject
            })
        })
        .catch(error => {
            console.error('There is has been a problem during updating meteo data: ' + error.message)
        })
}