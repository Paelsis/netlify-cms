
import React, {useState, useEffect}  from 'react'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddPhoto from "./AddPhoto"
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MakeThumbnailsIcon from '@material-ui/icons/PhotoSizeSelectSmallRounded';
import Tooltip from '@material-ui/core/Tooltip';
import axiosGet from './axiosGet'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const styles = {
    button:{width:45, height:45, padding:0, border:0}
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ViewImagesMenu = ({list, subdir, addNew, removeDeleted}) => {
    const [buttonColor, setButtonColor] = useState({addPhoto:'green', thumbnail:'green', deleteForever:'green'})
    const [image, setImage] = useState({})

    const deleteForever= () => {
      setButtonColor({...buttonColor, deleteForever:'yellow'})
      const files = list.filter(it => it.delete !== undefined).map(it => it.fname)
      console.log('files:', files)
      const payload = {
        files, 
        subdir, 
      }
      axios.post(apiBaseUrl + '/removeFiles', payload,
      {
        onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total)}
      }
      ).then(response => {
        console.log('Status code:', response.status);
        console.log('Status data:', response.data);
        removeDeleted()
        setButtonColor({...buttonColor, deleteForever:'lightGreen'})
      }).catch(error => {
        console.log('ERROR: Failed to upload:', error);
        setButtonColor({...buttonColor, deleteForever:'red'})
      });
  }

    const makeThumbnails = () => {
      const url = apiBaseUrl + '/createThumbnails?subdir=' + subdir
      setButtonColor({...buttonColor, thumbnail:'yellow'})
      axiosGet(url, data => {
        if (data === null) {
          setButtonColor({...buttonColor, thumbnail:'red'})
        } else if (data.result.length===0) {
          setButtonColor({...buttonColor, thumbnail:'lightGreen'})
        } else {
          setButtonColor({...buttonColor, thumbnail:'blue'})
        }
      })
    }

    return(
      <div>  
        <div className="columns">
          <Tooltip title={'Add a photo from camera or photo library'}>
            <AddPhoto subdir={subdir} addNew={addNew} style={{...styles.button, color:buttonColor.addPhoto}} />
          </Tooltip>
          <Tooltip title={'Remove all photos delete-marked phothos from disk'}>
            <DeleteForeverIcon 
              className="column" 
              onClick={deleteForever} 
              style={{...styles.button, color:buttonColor.deleteForever}}
            />
          </Tooltip>
          <Tooltip title={'Create thumbnails'} placement={'bottom'}>
            <MakeThumbnailsIcon 
              className="column" 
              data-tooltip="Tooltip Text"
              onClick={makeThumbnails} 
              style={{...styles.button, color:buttonColor.thumbnail}}
            />
          </Tooltip>
        </div>
      </div>
    )
}          
// <img className='column' src={it.src} height={160} alt={it.src}/>

export default ViewImagesMenu
    