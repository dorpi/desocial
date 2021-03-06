
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {toAbsoluteUrl} from './AssetsHelper';
import imgDefault from './default.png'
import {proxy} from '../../config'
const ImageUpload = ({
  info,
  placeholder,
  name,
  url,
  file,
  error,
  onChange,
  
}) => {
 
  return (
    <div className="form-group mb-3" >
        <img alt={imgDefault} className='w-25 mb-3 img-thumbnail rounded mx-auto d-block' src={file===''?`${toAbsoluteUrl(proxy+url)}?random=${Math.random()}`:toAbsoluteUrl(url)} />
        <div className='custom-file'>
        <input type="file" 
        placeholder={placeholder}
        className={classnames('form-control form-control-lg custom-file-input', { 'is-invalid': error })}
        name={name} id="file-upload"
        aria-describedby="file-upload" 
        onChange={onChange} />
        <label   
        className={classnames('form-control form-control-lg custom-file-label', { 'is-invalid': error })}
         htmlFor="file-upload">{file===''?'Choose file':file.name}</label>
          {info && <small className="form-text text-muted">{info}</small>}
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
     
    </div>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  url: PropTypes.string.isRequired,
  file:PropTypes.any,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

ImageUpload.defaultProps = {
  type: 'file'
};

export default ImageUpload;


/*
import React, { Component } from 'react'
import PropsType from 'prop-types'
import isEmpty from '../../validation/is-empty'


class ImageUpload extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedFile:'',
      imageName:''
    };
  }

  componentDidUpdate(prevProps){
    if (prevProps.selectedFile !== this.props.selectedFile){
      this.setState({selectedFile:this.props.selectedFile})
    }
    if (prevProps.imageName !== this.props.imageName){
      this.setState({imageName:this.props.imageName})
    }
  }
  componentDidMount(){
    this.setState({
      selectedFile:this.props.selectedFile,
      imageName:this.props.ImageName
    })
  }

  render() {
    const {onImageChange,error} = this.props
    let imageNameValue;
    if (isEmpty(this.state.imageName))
      imageNameValue= "Choose file";
    else {
      imageNameValue = this.state.imageName
    }


    return (

      <div className="form-group">
        <img className="card rounded-circle ml-auto mr-auto" style={{ height: '30vh', width: '15vw'}} src={this.state.selectedFile} alt="" />
        <input className="custom-file-input form-control form-control-lg"
          id="customFile"
          name="avatar"
          type="file"
          onChange={(e) =>onImageChange(e)}
        />
        <label className="custom-file-label form-control form-control-lg  position-relative" htmlFor="customFile" >{imageNameValue} </label>
        <small className="text-muted position-relative">Please select an Image for your Profile or leave empty</small>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    )
  }
}
ImageUpload.default = {

}

ImageUpload.PropsType={
  avatar:PropsType.string.isRequired,
  imageName:PropsType.string.isRequired
}

export default ImageUpload




/*import React from 'react'
const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default ReactUploadImage
*/