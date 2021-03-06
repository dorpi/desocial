import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {setAuthLoading, setCurrentUser} from '../../redux/actions/authActions'
import Spinner from '../common/Spinner'
class Landing extends Component {


  
  componentDidMount(){
   
    if (this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }    
    else 
      setCurrentUser({})
}


    render() {
      

      if (this.props.auth.loading)
        return <Spinner/>
      else 
        return (
            <div className="landing">
            <div className="dark-overlay landing-inner text-light">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Developer Connector
                    </h1>
                    <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                    <hr />
                    <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                    <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        )
    }
}

Landing.PropsTypes = {
  auth: PropsTypes.object.isRequired,
}

const mapStateToProps = state =>({
  auth:state.auth,
  
})

export default connect(mapStateToProps,{setAuthLoading,setCurrentUser})(Landing);