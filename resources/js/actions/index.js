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

export function updateGraph(year, month, day) {
    let headers = new Headers({
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"').getAttribute('content'),
        'Content-type': 'application/json'
    })

    let body = {
        day: day,
        month: month,
        year: year
    }

    fetch('/graph/update', {
        method: 'post',
        headers: headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(responseObject => {
            dispatcher.dispatch({
                type: types.GRAPH.UPDATE,
                response: responseObject
            })
        })
}
