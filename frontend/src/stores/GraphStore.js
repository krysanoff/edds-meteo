import dispatcher from '../utils/Dispatcher'
import { EventEmitter } from 'events'
import * as Actions from '../constants/ActionTypes'

let storeData = JSON.parse(document.getElementById('graph').dataset.graph)
console.log('graph init', storeData)

class GraphStore extends EventEmitter {
    initState() {
        return storeData
    }

    getState() {
        return storeData
    }

    handleActions(action) {
        switch(action.type) {
            case Actions.GRAPH.UPDATE:
                // console.log('meteo update store', action)
                storeData = action.response
                this.emit('updateGraph')
                break

            default:
                break
        }
    }


}

const graphStore = new GraphStore()
dispatcher.register(graphStore.handleActions.bind(graphStore))
export default graphStore