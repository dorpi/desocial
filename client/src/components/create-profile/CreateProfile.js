import React, { Component,createRef } from 'react'
import {withRouter,Link}from 'react-router-dom'

import {connect} from 'react-redux';
import PropsTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import ImageUpload from '../common/ImageUpload';
import {createProfile,clearErrors} from '../../redux/actions/profileActions'



class CreateProfile extends Component {

    

    constructor(props){
        super(props);
        this.state={
            displaySocialInputs:false,
            file:'',
            avatar:"/profile-images/default.png",
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            errors:{}
        }
        this.formRef= createRef();
        this.onImgChange=this.onImgChange.bind(this)
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }


    componentDidMount(){
      this.props.clearErrors();
    }
   
    componentDidUpdate(prevProps){
      if (prevProps.errors !== this.props.errors){
       this.setState({errors:this.props.errors})
      }
    }



    onSubmit(event){
      event.preventDefault();
      const profileData = new FormData(this.formRef.current)
      this.props.createProfile(profileData,this.props.history)
    }

    onChange(e){
      this.setState({errors:{
          ...this.state.errors,
          [e.target.name]:''
      }});
      this.setState({[e.target.name]:e.target.value});
  }


  onImgChange(e){
    this.setState({errors:{
      ...this.state.errors,
      [e.target.name]:''
  }});
    const fileString=URL.createObjectURL(e.target.files[0])
    this.setState({ file:e.target.files[0],[e.target.name]:fileString});
  }

    render() {
      const {errors,displaySocialInputs}=this.state;
     

      let socialInputs;
      if(displaySocialInputs){
        socialInputs = (
        <div>
          <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
          />
               <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
          />
<InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin}
          onChange={this.onChange}
          error={errors.linkedin}
          />
<InputGroup
          placeholder="Youtube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
          />
          
<InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
          />
        </div>)
      }

      //Select options for status
      const options=[
        {label:'* Select Professional Status',value:0},
        {label:'Developer', value:'Developer'},
        {label:'Junior Developer', value:'Junior Developer'},
        {label:'Senior Developer', value:'Senior Developer'},
        {label:'Manager', value:'Manager'},
        {label:'Student', value:'Student'},
        {label:'Instructor or Teacher', value:'Instructor or Teacher'},
        {label:'Intern', value:'Intern'},
        {label:'Other', value:'Other'}

      ];


        return (
            <div className="create-profile">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                <Link to='/dashboard' className="btn btn-light mb-3">Go Back</Link>
                  <h1 className="display-4 text-center">Create Your Profile</h1>
                  <p className="lead text-center">Let's get some information to make your profile stand out</p>
                  <small className="d-block pb-3">* = required field</small>
                  <form ref={this.formRef} onSubmit={this.onSubmit} encType="multipart/form-data">
                  <ImageUpload
                  placeholder="Image Profile"
                  name="avatar"
                  url = {this.state.avatar}
                  file={this.state.file}
                  onChange={this.onImgChange}
                  error={errors.avatar}
                  
                  info="This is your profile picture"
                />
                    <TextFieldGroup 
                    placeholder="*Profile Handle"
                    name="handle"
                    value={this.state.handle}
                    onChange={this.onChange}
                    error={errors.handle}
                    info="A unique handle for your profile URL. Your full name, comany name, nickname"
                    />
                        <SelectListGroup 
                    placeholder="Status"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    options={options}
                    info="Give us an idea where you are at in your career"
                    />
                     <TextFieldGroup 
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Could be your own company or one you wrok for."
                    />
                     <TextFieldGroup 
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="City or city & state suggested (eg: Boston, MA"
                    />
                      <TextFieldGroup 
                    placeholder="Skils"
                    name="skills"
                    value={this.state.skills}
                    onChange={this.onChange}
                    error={errors.skills}
                    info="Please user comma sperated values(eg: HTML,CSS,JavaScript,PHP"
                    />
                      <TextFieldGroup 
                    placeholder="Github Username"
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.onChange}
                    error={errors.githubusername}
                    info="If you want your latest repos and Github link, include your username"
                    />
                            <TextAreaFieldGroup 
                    placeholder="Short Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                    error={errors.bio}
                    info="Tell us a little about yourself"
                    />
                      <InputGroup
          placeholder="Website URL"
          name="website"
          icon="fas fa-globe"
          value={this.state.website}
          onChange={this.onChange}
          error={errors.website}
          />

                   
                   <div className="mb-3">
                     <button
                     type="button"
                      className="btn btn-light" onClick={()=>{
                       this.setState((prevState=>({
                         displaySocialInputs: !prevState.displaySocialInputs
                       })))
                     }}>Add Social Network Links</button>
                     <span className="text-muted">Optional</span>
                     </div> 
                     {socialInputs}
                     <div></div>
                     <input type='submit' value="Submit" className="btn btn-info btn-block mt-4"/>   
                   </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

CreateProfile.PropsTypes = {
    profile:PropsTypes.object.isRequired,
    errors:PropsTypes.object.isRequired
}



const mapStateToProps = state =>({
    profile:state.profile,
    errors:state.errors
})



export default connect(mapStateToProps,{createProfile,clearErrors})(withRouter(CreateProfile));