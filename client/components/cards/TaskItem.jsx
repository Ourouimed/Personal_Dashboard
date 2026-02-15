import { Circle, CircleCheck, Trash2 } from "lucide-react"

const TaskItem = ({t , onDelete , onStatusChange})=>{
    return <div
                className="group flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
            >
        <div
                                className="flex items-center gap-3 cursor-pointer flex-1"
                                onClick={onStatusChange}
                            >
                                <button className="transition-transform active:scale-90">
                                    {t.status === 'active' ? (
                                        <Circle className="text-gray-300 group-hover:text-gray-400" size={22} />
                                    ) : (
                                        <CircleCheck className="text-white rounded-full bg-green-500" size={22} />
                                    )}
                                </button>
                                <h4
                                    className={`text-md transition-all duration-300 ${
                                        t.status === 'completed'
                                            ? 'line-through text-gray-400 italic'
                                            : 'text-gray-700 font-medium'
                                    }`}
                                >
                                    {t.title}
                                </h4>
                            </div>

                            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-full" onClick={onDelete}>
                                <Trash2 size={18} className="text-red-400 hover:text-red-600" />
                            </button>
                        </div>
}

export default TaskItem