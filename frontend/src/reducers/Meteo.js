import {
    GET_CURRENT_METEO
} from "../constants/ActionTypes"

const meteo = JSON.parse(document.getElementById('meteo').getAttribute('data-meteo'))
console.log(meteo)
const initialState = [
    meteo
]

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_METEO:
            return [
                ...state,
                {
                    "Ta": -30,
                    "Dn": 180
                }
            ]

        default:
            return state
    }
}