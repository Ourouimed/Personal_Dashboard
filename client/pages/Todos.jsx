import { useEffect, useRef, useState } from "react";
import { styles } from "../lib/styles";
import { Circle, CircleCheck, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, changeTaskStatus, deleteTask, getAllTasks } from "../store/features/tasks/taskSlice";

const Todos = () => {
    const dispatch = useDispatch();
    const { isLoading, tasks } = useSelector((state) => state.tasks);
    
    const [filter, setFilter] = useState('all');
    const todoTextRef = useRef();

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    const completedCount = tasks.filter(t => t.status === 'completed').length;
    const totalCount = tasks.length;

    const filteredTasks = tasks.filter(t => {
        if (filter === 'active') return t.status === 'active';
        if (filter === 'completed') return t.status === 'completed';
        return true;
    });

    const handleAddTask = async () => {
        const value = todoTextRef.current.value.trim();
        if (!value) return;
        
        await dispatch(addTask(value)).unwrap();
        todoTextRef.current.value = '';
    }


    const handleDeleteTask = async (id)=>{
        await dispatch(deleteTask(id)).unwrap()
    }

    const handleChangeTaskStatus = async (task) => {
        const updatedTask = {
            ...task,
            status: task.status === 'active' ? 'completed' : 'active'
        };
        await dispatch(changeTaskStatus(updatedTask)).unwrap();
    };

    return (
        <div className="p-4 space-y-6 mx-auto">
            {/* Header & Stats */}
            <div className="flex justify-between items-end">
                <div className="space-y-1"> 
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Todos</h3>
                    <p className="text-sm text-gray-500 font-medium">
                        {completedCount}/{totalCount} Tasks Completed
                    </p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                    {['all', 'active', 'completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 cursor-pointer py-1 text-xs sm:text-sm font-semibold rounded-md transition-all capitalize ${
                                filter === f
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-4 gap-2">
                <input
                    type="text"
                    className={`${styles.input} col-span-3`}
                    ref={todoTextRef}
                    placeholder="What needs to be done?"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <button 
                    className={`${styles.button} text-sm justify-center gap-2`} 
                    onClick={handleAddTask}
                >
                    Add <Plus size={16} />
                </button>
            </div>

            {/* Task List */}
            <div className="rounded-xl border border-gray-200 divide-y divide-gray-200 bg-white shadow-sm overflow-hidden">
                {isLoading && tasks.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 animate-pulse">
                        Loading your tasks...
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        {filter === 'all' 
                            ? "Your list is empty. Add a task to get started!" 
                            : `No ${filter} tasks found.`}
                    </div>
                ) : (
                    filteredTasks.map((t) => (
                        <div
                            key={t._id}
                            className="group flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div
                                className="flex items-center gap-3 cursor-pointer flex-1"
                                onClick={() => handleChangeTaskStatus(t)}
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

                            <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-full" onClick={()=> handleDeleteTask(t._id)}>
                                <Trash2 size={18} className="text-red-400 hover:text-red-600" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Todos;