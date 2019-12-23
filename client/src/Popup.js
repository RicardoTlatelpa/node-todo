import React, {Component} from 'react';
import './styles/Popup.css';
import axios from 'axios';

class Popup extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      file: e.target.files[0]
    });
  }
  handleSubmit(event){
    
    const formData = new FormData();
    formData.append('clientFile', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(`/api/${this.props.id}/attachment`, formData,config)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
  }
  render(){
    
  return (
  <div className = "popup">
      <div className = "popupinner">
      <h1>Upload Files</h1>
      <form onSubmit = {this.handleSubmit}>
          <input type = "file" id = 'clientFile' onChange = {this.handleChange}/>
          <br/>
          <button>Upload</button>
      </form>
    
      </div>
  </div>)
  } 
}
export default Popup;