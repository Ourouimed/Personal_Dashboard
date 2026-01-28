import { Plus } from "lucide-react"

const Projects = ()=>{
    return <>
        <div className="flex justify-between items-center">
            <h3 className="text-xl sm:text-2xl font-semibold">My Projects</h3>
            <button className="bg-blue-600 rounded-md text-sm py-2 px-4 font-semibold flex items-center gap-1 text-white cursor-pointer">
                add new project <Plus size={14}/>
            </button>
        </div>
    </>
}

export default Projects