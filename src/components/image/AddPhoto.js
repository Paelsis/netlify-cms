import React, {Component} from 'react'
import axios from 'axios'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles={
  button:{width:45, height:45, padding:0, border:0},
  preview: {
    padding:1, 
    border:2, 
    borderStyle: 'dotted',
    borderColor:'red'
  }
}

class AddPhoto extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedFile: undefined,
        imagePreviewUrl: undefined,
        newFileName: undefined,
        subdir:undefined,
        buttonColor:'green'
      };
      this.trimSubdir = this.trimSubdir.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeFileName = this.handleChangeFileName.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    trimSubdir(s) {
      //const subdir=props.subdir?props.subdir:props.match?props.match.params?props.match.params.subdir:undefined:undefined
      const subdir=s
      console.log('trimSubdir, subdir:', subdir)
      return(subdir?(subdir.charAt(0)==='/'?'':'/') + subdir:undefined)
    }

    componentDidMount() {
      const subdir = this.trimSubdir(this.props.subdir)
      this.setState({subdir})
    }

    componentWillReceiveProps(nextProps) {
      if ((this.trimSubdir(this.props.subdir) !== this.trimSubdir(nextProps.subdir)) && (nextProps.subdir !== undefined)) {
        const subdir = this.trimSubdir(nextProps.subdir)
        if (subdir !== undefined) {
          this.setState({subdir})
        }  
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      if (this.state.selectedFile) {
        const formData = new FormData()
        console.log('VVVVVVVVVVVVV this.state.subdir=', this.state.subdir )
        formData.append('subdir', this.state.subdir)
        formData.append('newfile', this.state.selectedFile, this.state.newFileName)
        console.log('formData', formData)
        this.setState({bottonColor:'yellow'})
        axios.post(apiBaseUrl + '/postImage', formData, {
            onUploadProgress: progressEvent => console.log(progressEvent.loaded / progressEvent.total)
        }).then(response => {
            console.log('response:', response);
            this.props.addNew(this.state.newFileName?this.state.newFileName:this.state.selectedFile.name)
            this.setState({selectedFile: undefined, imagePreviewUrl:undefined, newFileName:undefined, buttonColor:'lightGreen'})
        }).catch(error => {
            console.log('ERROR: Failed to upload:', error);
            this.setState({bottonColor:'red'})
        });
      }
    }

    handleChange(e) {
      e.preventDefault();
  
      const selectedFile = e.target.files[0];
  
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          selectedFile,
          imagePreviewUrl: reader.result,
          newFileName:selectedFile.name,
        });
      }
      reader.readAsDataURL(selectedFile)
    }  

    handleChangeFileName(e) {
      e.preventDefault();
      const newFileName = e.target.value
      this.setState({newFileName})
    }  

    addPhotoButton() {return( 
      <div className='column columns' >
        <input 
          className='column'
          key={'newfile'}
          type="file" 
          name="newfile"
          accept="image/*" 
          onChange={this.handleChange}

          style={{display:'none'}}
          ref={fileInput => this.fileInput = fileInput} 
        />
        <AddAPhotoIcon className='column' style={{...this.props.style?this.props.style:styles.button, color:this.state.buttonColor}} onClick={()=>this.fileInput.click()} />
      </div>
    )}

    render() {
      return(
        <form className='column' onSubmit={e=>this.handleSubmit(e)} style={{padding:0}}>
            {this.addPhotoButton()}
            {this.state.selectedFile && this.state.imagePreviewUrl?
                  <span className='columns is-vcentered' style={{width:'100%'}}>
                    <input 
                      className='column'  
                      style={{height:40}}
                      key={'newFileName'} 
                      type="text" 
                      name="newFileName" 
                      value={this.state.newFileName}
                      placeholder={this.state.newFileName}
                      onChange={this.handleChangeFileName}
                    />
                    {this.state.imagePreviewUrl?
                       <img className='column' style={{height:80}} src = {this.state.imagePreviewUrl} alt={this.state.imagePreviewUrl} />
                    :null}  
                    <button className='column' type="submit" style={{background:'transparent', border:'none'}} >
                          <SaveAltIcon display='none' style={{...styles.button, color:this.state.buttonColor}} />
                    </button>
                    <button className='column' 
                      style={{background:'transparent', border:'none'}}
                      onClick={()=>this.setState({selectedFile: undefined, imagePreviewUrl:undefined, newFileName:undefined, buttonColor:'lightGreen'})}
                    >
                      <CancelIcon style={{...styles.button, color:this.state.buttonColor}} />                              
                  </button>
                </span>
            :null
           }
        </form>
      )
    }
  }

  export default AddPhoto
  
  
