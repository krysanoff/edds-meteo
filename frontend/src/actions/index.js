import * as types from '../constants/ActionTypes'
import dispatcher from '../utils/Dispatcher'

export const METEO = {
    UPDATE: 'updateMeteo'
}

export function updateMeteo() {
    dispatcher.dispatch({
        type: METEO.UPDATE
    })
}