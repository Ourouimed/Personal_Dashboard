import { Plus } from "lucide-react"
import Popup from "../components/Popup"
import { useEffect, useState } from "react"
import AddProjectPopup from "../components/popus-forms/AddProjectPopup"
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects } from "../store/features/projects/projectSlice"
import ProjectItem from "../components/cards/ProjectItem"
import { styles } from "../lib/styles"
import DeleteProjectPopup from "../components/popus-forms/DeleteProjectPopup"
import UpdateProjectPopup from "../components/popus-forms/UpdateProjectPopup"

const Projects = ()=>{
    const [popupData , setPopupData] = useState({
        isOpen : false ,
        title : null ,
        content : null
    })

    const dispatch = useDispatch()
    const { isLoading , projects} = useSelector(state => state.projects)

    useEffect(()=>{
        dispatch(getAllProjects())
    } , [dispatch])


    const handleClosePopup = ()=> setPopupData({isOpen : false ,title : null , content : null})

    const handleOpenAddProjectPopup = ()=>{
        setPopupData({isOpen : true , title : 'Add new project' , content : <AddProjectPopup onClose={handleClosePopup}/>})
    }

    const handleOpenDeleteProjectPopup = (id)=>{
        setPopupData({isOpen : true , title : 'Delete project' , content : <DeleteProjectPopup id={id} onClose={handleClosePopup}/>})
    }


    const handleOpenUpdateProjectPopup = (p)=>{
        setPopupData({isOpen : true , title : 'Update project' , content : <UpdateProjectPopup onClose={handleClosePopup} project={p}/>})
    }

    
    return <>
        <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-2xl font-semibold">My Projects</h3>
            <button 
                className={styles.button}
                onClick={handleOpenAddProjectPopup}>
                add new project <Plus size={14}/>
            </button>
        </div>

        {popupData.isOpen && <Popup title={popupData.title} onClose={handleClosePopup}>
                {popupData.content}
        </Popup>} 

        {isLoading ? 'Loading projects...' : projects.length === 0 ? 'No available projects': (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-1 gap-4">
    {projects.map((p) => <ProjectItem item={p} key={p._id} onDelete={()=> handleOpenDeleteProjectPopup(p._id)} onUpdate={()=> handleOpenUpdateProjectPopup(p)}/>)}
  </div>
)}
    </>
}

export default Projects