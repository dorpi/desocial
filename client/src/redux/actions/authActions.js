import {GET_ERRORS,SET_CURRENT_USER} from './types'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'; 
import jwt_decode from 'jwt-decode';

//Register user
export const registerUser = (userData,history) =>dispatch=>{
    axios.post('/api/users/register',userData)  //Don't need to wtite localhost 5000 because the proxy
    .then(res=>history.push('/login'))
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }));
}

//Login - Get user token
export const loginUser = userData=>dispatch=>{
    
    axios.post('/api/users/login',userData)
    .then(res=>{
        
        const {token}=res.data;
        //Save to local storage
        localStorage.setItem('jwtToken',token);
        // Set token to Auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded))
    })
    .catch(err=>dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
};


//Set logged in user
export const setCurrentUser = decoded =>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}


//Logout user
export const logoutUser = () =>dispatch=>{
//Remove token from localstorage
localStorage.removeItem('jwtToken');
//remove auth header for future requests
setAuthToken(false);
//Set current user to {} which will set is authenticated to false
dispatch(setCurrentUser({}));
 

}