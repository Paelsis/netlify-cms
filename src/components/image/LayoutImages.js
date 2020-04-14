import React, {useState, useEffect}  from 'react'
import axios from 'axios'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL


const LayoutImages = (props) => {
    const {subdir, children} = props
    const subdirSingleSlash=subdir?subdir.charAt(0)==='/'?'':'/' + subdir:('/images')
    const url=apiBaseUrl + '/listImagesData?subdir=' + subdir
    const path=apiBaseUrl + subdir
    const [list, setList] = useState([]);
    const image = (im) => ({src:path + '/' + im.fname, fname:im.fname, mdate:im.mdate?im.mdate:undefined, subdir})
    const toggleField = (ix, fld) => setList([...list.slice(0, ix), {...list[ix], [fld]:list[ix][fld]?undefined:true}, ...list.slice(ix + 1)])
    const removeDeleted = () => setList(list.filter(it => it.delete?false:true))
    const addNew = (fname) => setList([...list, image({fname})])
    useEffect(() => {
        const fetchData = async () => {
          const flag = true;  
          const result = await axios(url,);
          const list0 = result.data.result.map(it => image(it)).sort((a,b)=>a.mdate===undefined?1:b.mdate===undefined?-1:a.mdate - b.mdate)  
          setList(list0);
      };
        fetchData();
    }, [props]);
    const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {list, subdir, toggleField, addNew, removeDeleted})
)
return (
        childrenWithProps
    )  
}    

export default LayoutImages