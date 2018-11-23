import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Meteodash from '../components/Meteodash'
import * as Actions from '../actions'


const mapStateToProps = state => ({
    meteo: state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

fetch('http://localhost:8000/meteo/last')
    .then(function (response) {
        console.log(response)
    })
    .catch(alert)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Meteodash)