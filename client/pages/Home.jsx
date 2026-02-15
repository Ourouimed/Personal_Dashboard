import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import StatItem from "../components/cards/StatItem";
import { getAllTasks } from "../store/features/tasks/taskSlice";
import { getAllProjects } from "../store/features/projects/projectSlice";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()
    const { isLoading: tasksLoading, tasks } = useSelector(state => state.tasks)
    const { isLoading: projectsLoading, projects } = useSelector(state => state.projects)

    useEffect(() => {
        dispatch(getAllTasks());
        dispatch(getAllProjects())
    }, [dispatch]);

    const calculatedStats = useMemo(() => {
        const completedTasks = tasks.filter(t => t.status === 'completed').length
        const activeTasks = tasks.filter(t => t.status === 'active').length
        const totalTasks = tasks.length || 0
        const percentage = (completedTasks * 100) / totalTasks || 0
        return {
            tasks: {
                total: totalTasks,
                completed: completedTasks,
                active: activeTasks,
                percentage
            },
            projects: projects.length
        }
    }, [tasks, projects.length]) 

    if (tasksLoading || projectsLoading) return <p className="p-4 text-center">...loading</p>

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            
            <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800">Welcome back</h3>
                <p className="text-gray-600">Here's your productivity overview</p>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <StatItem 
                    title={'Completion Rate'} 
                    num={calculatedStats.tasks.percentage.toFixed(0) + '%'}
                    subText={`${calculatedStats.tasks.completed} of ${calculatedStats.tasks.total} tasks completed`}
                />
                <StatItem 
                    title={'Total Projects'} 
                    num={calculatedStats.projects}
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h4 className="font-semibold text-gray-700 text-lg">Recent Tasks</h4>
                    <Link to={'/todos'} className="text-sm text-blue-600 font-medium">View all</Link>
                </div>
                
                <div className="divide-y divide-gray-100">
                    {tasks.length > 0 ? (
                        tasks.slice(0, 5).map((task) => (
                            <div key={task.id || task._id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-3 h-3 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-400'}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${
                                        task.status === 'completed'
                                            ? 'line-through text-gray-400 italic'
                                            : 'text-gray-700 font-medium'
                                    }`}>{task.title}</p>
                                        
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                    {task.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-center text-gray-500">No tasks found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;