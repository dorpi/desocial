const isEmpty=require ('./is-empty.js')
const Validator= require('validator');

module.exports = function validateRegisterInput(data){
    let errors={};
  
    data.name = !isEmpty(data.name)? data.name:''; // because isEmpty deal with blank string
    data.email = !isEmpty(data.email)? data.email:''; 
    data.password = !isEmpty(data.password)? data.password:''; 
    data.password2 = !isEmpty(data.password2)? data.password2:''; // the confirmed password

    if (!Validator.isLength(data.name,{min:2, max:30})){
        
        errors.name = 'Name must be between 2 and 30 characters'
    }
    if (!Validator.isLength(data.password,{min:6, max:30})){   
        errors.password = 'Password must be between 6 and 30 characters'
    }

    if (!Validator.equals(data.password,data.password2)){
        errors.password2 = 'Password must be match';
    }


    if (!Validator.isEmail(data.email)){
        errors.email='Email is invalid';
    }
    if (Validator.isEmpty(data.name)){
        errors.name='Name field is required';
    }
    if (Validator.isEmpty(data.email)){
        errors.email='Email field is required';
    }
    if (Validator.isEmpty(data.password)){
        errors.password='Password field is required';
    } 
    
    if (Validator.isEmpty(data.password2)){
        errors.password2='Confirm password field is required';
    }
   
   
    return {
        errors,
        isValid:isEmpty(errors)
    }
}