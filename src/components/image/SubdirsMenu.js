import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import LayoutImages from "./LayoutImages"
import ViewImagesMenu from "./ViewImagesMenu"
import ViewImages from "./ViewImages"
import Timeline from "../timeline/Timeline"
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL


const SubdirsMenu = (props) => {
    const url=apiBaseUrl + '/listDirs?subdir=' + props.subdir
    const [dirs, setDirs] = useState([]);
    const [subdir, setSubdir] = useState(props.subdir)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
          const flag = true;  
          const result = await axios(url,);
          const ds = result.data.result.map(dir => dir)  
          setDirs(ds);
      };
        fetchData();
    }, []);
    return (
        <div className='columns' >
            <div className="column is-one-third">
                <aside className="menu">
                    <p className="menu-label">
                        Sub-directory
                    </p>
                    <ul className="menu-list">
                        {dirs.map(di =>
                         <li ><a className={'menu-item' + di===subdir?'is-active':''} onClick={()=>setSubdir(di)}>{di.substring(di.lastIndexOf('/')+1)}</a></li>
                        )}
                    </ul>
                </aside>
            </div>
            <div className="column">
                <LayoutImages subdir={'/' + subdir}>
                    <Timeline />
                    <ViewImagesMenu />
                    <ViewImages />
                </LayoutImages>    
            </div>
        </div>
    )  
}    

export default SubdirsMenu

