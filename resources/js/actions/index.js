import * as types from '../constants/ActionTypes'
import dispatcher from '../utils/Dispatcher'

export function updateMeteo() {
    fetch('/api/meteo/last')
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

export function updateGraph(year, month, day) {
    let headers = new Headers({
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"').getAttribute('content'),
        'Content-type': 'application/json'
    })

    let url = '/api/graph/update'
    if (year) {
        url += '/' + year

        if (month) {
            url += '/' + month

            if (day) {
                url += day
            }
        }
    }

    fetch(url, {
        method: 'get',
        headers: headers
    })
        .then(response => response.json())
        .then(responseObject => {
            dispatcher.dispatch({
                type: types.GRAPH.UPDATE,
                response: responseObject
            })
        })
}
