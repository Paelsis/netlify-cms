
import React, {useState}  from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


import ViewImage from './ViewImage'



const ViewImages = ({list, toggleField}) => {
    console.log('list (View Images:', list)
    return(
      <div>
        <div className='columns is-multiline'>
          {list.map((image, index) => 
            <ViewImage 
              src={image.src} 
              className='column is-one-fifth'
              height={120} 
              image={image} 
              toggleDelete={()=>toggleField(index, 'delete')} 
              toggleExpand={()=>toggleField(index, 'expand')}     
            />
          )}
        </div>
        <div className='columns is-multiline'>
          {list.map((image, index) => 
            image.expand?
                <ViewImage 
                  className='column is-half'
                  src={image.src} 
                  image={image} 
                  toggleExpand={()=>toggleField(index, 'expand')}     
                  />
            :null
        )}
        </div>
      </div>  
    )
}          
// <img className='column' src={it.src} height={160} alt={it.src}/>

export default ViewImages
    