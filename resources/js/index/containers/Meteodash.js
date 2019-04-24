import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Meteodash from '../components/Meteodash'
import * as Actions from '../actions'


const mapStateToProps = state => ({
    state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

let data = fetch('http://localhost:8000/meteo/last')
    .then(response => {
        console.log(response)
        return response.text()
    })
    .then(response => {
        console.log(response)
    })
    .catch(response => console.error(response))

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Meteodash)