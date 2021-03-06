import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {addComment} from '../../redux/actions/postActions';


 class CommentForm extends Component {
     constructor(props){
         super(props);
         this.state ={
             text:'',
             errors:{}
         }
         this.onChange=this.onChange.bind(this)
         this.onSubmit=this.onSubmit.bind(this)
     }

     

     componentDidUpdate(prevProps){
      if (prevProps.errors !== this.props.errors){
       this.setState({errors:this.props.errors})
      }
    }

     onChange(e){
      this.setState({errors:{
          ...this.state.errors,
          [e.target.name]:''
      }});
      this.setState({[e.target.name]:e.target.value});
  }

     onSubmit(e){
        e.preventDefault();
        const {user} = this.props.auth;
        const {postId} = this.props;

        const newComment = {
            text:this.state.text,
            name:user.name,
            user:user
        }
        this.props.addComment(postId,newComment)
        this.setState({text:''})
     }
     
    render() {
        const {errors}= this.state

        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}> 
                  <div className="form-group">
                   <TextAreaFieldGroup
                    placeholder="Reply to post"
                    name="text"
                    value={this.state.text}
                    onChange = {this.onChange}
                    error={errors.text}
                   />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

CommentForm.PropsTypes = {
    errors:PropsTypes.object.isRequired,
    auth:PropsTypes.object.isRequired,
    addComment:PropsTypes.func.isRequired,
    postId:PropsTypes.string.isRequired
}


const mapStateToProps  = state=>({
    auth:state.auth,
    errors:state.errors 
})


export default connect(mapStateToProps,{addComment})(CommentForm);