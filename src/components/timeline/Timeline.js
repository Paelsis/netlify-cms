import React, {useState} from "react"
import { Link } from "gatsby"

const Timeline = ({list}) => {
  const arr0 = new Array(60).fill(false)
  const [arr, setArr] = useState(arr0);
  const toggleArr = (ix) => setArr([...arr.slice(0, ix), arr[ix]===true?false:true, ...arr.slice(ix + 1)])
  console.log('arr0.length', arr0.length)
return(
<div class="timeline">
  <header class="timeline-header">
    <span class="tag is-medium is-primary"  style={{borderRadius:32}}>Start</span>
  </header>
  <div class="timeline-item is-primary">
    <div class="timeline-marker is-primary"></div>
    <div class="timeline-content">
      <p class="heading">January 2016</p>
      <p>Timeline content - Can include any HTML element</p>
    </div>
  </div>
  {list.map((it, index)=>
    <div class="timeline-item is-warning" >
      <div class={"timeline-marker is-warning is-image is-64x64"} onClick={()=>toggleArr(index)}>
          <img src={it.src} style={{height:arr[index]?128:64}} alt='No image' />
      </div>
      <div class="timeline-content">
        <p class="heading">{it.fname}</p>
        <p>Timeline content - Can include any HTML element - {it.mdate}</p>
        {<img src={it.src} style={{width:arr[index]?'50vw':0, opacity:arr[index]?1.0:0.0, transition:'1000ms all ease'}} alt={it.src} />}
      </div>
    </div>  
  )}
  <header class="timeline-header">
    <span class="tag is-primary">2017</span>
  </header>
  <div class="timeline-item is-danger">
    <div class="timeline-marker is-danger is-icon">
      <i class="fa fa-flag"></i>
    </div>
    <div class="timeline-content">
      <p class="heading">March 2017</p>
      <p>Timeline content - Can include any HTML element</p>
    </div>
  </div>
  <header class="timeline-header">
    <span class="tag is-medium is-primary">End</span>
  </header>
</div>
)}

export default Timeline
