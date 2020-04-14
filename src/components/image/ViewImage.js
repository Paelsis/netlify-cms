import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
  image:{
    position:'relative',  
    padding:10,
    // background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
  },
  delete:{
    padding:10,
    // background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    opacity:0.2,
  },
  expand:{
    padding:0,
    border:10,
    borderStyle:'solid',
    borderColor:'lightGreen',
    // background: 'linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%',
    opacity:0.8,
  },
  deleteButton: (del)=>({
    position:'absolute',
    right:10,
    top:10,
    color:del?'red':'white',
    zIndex:1000,
    opacity:del?0.95:0.75,
  }),
  text:{
    position:'absolute',
    left:10,
    bottom:20,
    color:'green',
    zIndex:2000,
    opacity:0.75,
    fontSize:'xx-small',
  },
}

const ViewImage = ({src, height, image, className, toggleDelete, toggleExpand}) => {  
  let style = {...styles.image, 
    ...image.expand?styles.expand:{}, 
    ...image.delete?styles.delete:{}}
  return (
      <div className={className} style={{padding:0, margin:0, position:'relative'}}>
        <img style={style} 
            src = {src} 
            alt={src}
            onClick={toggleExpand}
        /> 
        {toggleDelete?
          <CancelIcon 
              style={styles.deleteButton(image.delete?true:undefined)} 
              onClick={toggleDelete}
          />
        :null}  
        <div style={styles.text}>
          {image.fname}  
        </div>  
        
      </div>
  )
}

export default ViewImage