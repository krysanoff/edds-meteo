import dispatcher from '../utils/Dispatcher'
import { EventEmitter } from 'events'
import * as Actions from '../actions'

let storeData = JSON.parse(document.getElementById('meteo').dataset.meteo)

class MeteoStore extends EventEmitter {
    initState() {
        return storeData
    }

    getState() {
        return storeData
    }

    handleActions(action) {
        switch(action.type) {
            case Actions.METEO.UPDATE:
                // console.log('meteo update store', action)
                storeData = action.response
                this.emit('updateMeteo')
                break

            default:
                console.log('Unknown action type')
        }
    }
}

const meteoStore = new MeteoStore()
dispatcher.register(meteoStore.handleActions.bind(meteoStore))
export default meteoStore