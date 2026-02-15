import { useDispatch, useSelector } from "react-redux"
import { styles } from "../../lib/styles"
import { useState } from "react"
import { Loader2, Trash } from "lucide-react"
import { deleteTimeline } from "../../store/features/timeline/timelineSlice"

const DeleteTimeLinePopup = ({id , onClose})=>{
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.timeline)
    const [errors , setErrors] = useState({})

    const handledeleteProject = async ()=>{
        try {
            await dispatch(deleteTimeline(id)).unwrap()
            onClose()
        }
        catch (err){
            console.log(err)
            setErrors({ submit: "Failed to connect to server" });
        }
    }
    return <>
        {errors.submit && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">{errors.submit}</div>}
        <p>
            Are you sure you want to delete <span className="font-semibold">{id}</span>? 
        </p>
        
        <div className="flex items-center justify-end mt-4 gap-2 flex-wrap">
            <button onClick={onClose} className="text-sm py-2 px-4 text-gray-600 border cursor-pointer border-gray-300 rounded-lg font-semibold transition">
                Cancel
            </button>
            <button className={`${styles.button} !bg-red-500 text-sm`} onClick={handledeleteProject}>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Trash size={14}/>}
                {isLoading ? 'Deleting...' : 'Delete Project'} 
            </button>
        </div>
    </>
}

export default DeleteTimeLinePopup