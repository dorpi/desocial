import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import PropsTypes from 'prop-types';
import {addExperience,clearErrors} from '../../redux/actions/profileActions'

class AddExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.onCheck=this.onCheck.bind(this)

    }

   
    componentDidMount(){
        this.props.clearErrors();
    }


    componentDidUpdate(prevProps){
        if (prevProps.errors !== this.props.errors){
         this.setState({errors:this.props.errors})
        }
      }
 
    onSubmit(e){
        e.preventDefault();
            //Get experience details
            const expData = {
                company: this.state.company,
                title: this.state.title,
                location: this.state.location,
                from: this.state.from,
                to: this.state.to,
                current: this.state.current,
                description: this.state.description,
               
            }
            //action
            this.props.addExperience(expData,this.props.history)
    }
    onCheck(e){
        this.setState({
            current:!this.state.current,
            disabled:!this.state.disabled});
    }
    onChange(e){
        this.setState({errors:{
            ...this.state.errors,
            [e.target.name]:''
        }});
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        const { errors } = this.state;
        
        return (
            <div className="section add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <Link to='/dashboard' className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Your Experience</h1>
                            <p className="lead text-center">Add any developer/programming positions that you have or had in the past</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Company"
                                    name="company"
                                    value ={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                 <TextFieldGroup
                                    placeholder="* Job Title"
                                    name="title"
                                    value ={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value ={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    type="date"
                                    placeholder="from"
                                    name="from"
                                    value ={this.state.from}
                                    onChange={this.onChange}
                                    error={errors.from}
                               
                                />
                                <h6>To Date</h6>
                                 <TextFieldGroup
                                 type="date"
                                    placeholder="to"
                                    name="to"
                                    value ={this.state.to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={this.state.disabled?'disabled':''}
                                />
                                <div className="form-check mb-4">
                                    <input 
                                    type="checkBox" 
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                    
                                    />
                                    <label htmlFor="current" className="form-check-label">Current Job</label>
                                </div>
                        
                                <TextAreaFieldGroup
                                    placeholder="Job Description"
                                    name="description"
                                    value ={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the position"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block"></input>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

AddExperience.PropsTypes = {
    profile: PropsTypes.object.isRequired,
    errors: PropsTypes.object.isRequired,
    addExperience:PropsTypes.func.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})
export default connect(mapStateToProps,{addExperience,clearErrors})(withRouter(AddExperience))