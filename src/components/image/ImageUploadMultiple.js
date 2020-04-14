import React, {Component} from 'react'
import axios from 'axios'
import config from 'Settings/config' 

const apiBaseUrl=config[process.env.NODE_ENV].apiBaseUrl;


class ImageUploadMultiple extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedFiles:[],
        imagePreviewUrls: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  

    handleSubmit(event) {
      event.preventDefault();

      if (this.state.selectedFiles.length > 0) {
        const formData = new FormData()
        for(let i=0; i < this.state.selectedFiles.length; i++) {
          let selectedFile = this.state.selectedFiles[i]
          formData.append('newfile_arr[]', selectedFile, selectedFile.name)
        } 
        console.log('formData', formData)
        axios.post(apiBaseUrl + '/postImages', formData,
            {
                onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total)}
            }
        ).then(response => {
            console.log('Status code:', response.status);
            console.log('Status data:', response.data);
            this.setState({selectedFiles:[], imagePreviewUrls:[]})
        }).catch(error => {
            console.log('ERROR: Failed to upload:', error);
        });
      }
    }

    handleChange(e) {
      e.preventDefault();
      const selectedFiles = e.target.files;
      for(let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            selectedFiles: [...this.state.selectedFiles, selectedFiles[i]],
            imagePreviewUrls: [...this.state.imagePreviewUrls, reader.result]
          });
        }
        reader.readAsDataURL(selectedFiles[i])
      }  
    }

    _form() {    
      return(
          <form onSubmit={e=>this.handleSubmit(e)}>
              <input 
                  type="file" 
                  name="newfile"
                  accept="image/*" 
                  onChange={this.handleChange} 
                  style={{display:'none'}}
                  ref={fileInput => this.fileInput = fileInput} 
                  multiple
              />
              <button onClick={()=>this.fileInput.click()}>Pick multiple images</button>
              <button type="submit">Upload multiple images</button>
          </form>
      )
  }


  render() {
      let {imagePreviewUrls} = this.state;
      return (
        <div>
          {this._form()}  
          {imagePreviewUrls?imagePreviewUrls.map(it=><img src={it} height={100} style={{padding:10, border:2}}/>):null}
        </div>
      )
    }
  
  }
  
  export default ImageUploadMultiple
  