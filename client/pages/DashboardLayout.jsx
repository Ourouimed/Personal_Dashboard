import { Link, Outlet, useNavigate } from "react-router-dom"
import { sidebar } from "../lib/links"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { verifySession } from "../store/features/auth/authSlice"

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user , isInitialized} = useSelector(state => state.auth)



    useEffect(() => {
        if (!isInitialized) {
            dispatch(verifySession());
        }
    }, [dispatch, isInitialized]);

 
     useEffect(() => {
        if (!user && isInitialized) {
            navigate('/login')
        };
        
        }, [dispatch, user]);
    return (
        <section className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <aside className={`sticky h-screen top-0 bg-white shadow-md z-50 
                ${sidebarOpen ? 'w-[250px]' : 'w-[70px]'} 
                transition-all duration-300 ease-in-out flex flex-col`}>
                
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    {sidebarOpen && (
                        <h4 className="font-bold text-gray-800 truncate">Ourouimed</h4>
                    )}
                    <button 
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 
                                   flex items-center justify-center cursor-pointer transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    <ul className="space-y-2">
                        {sidebar.map(({ name, icon: Icon, url }) => (
                            <li key={name} className="relative group">
                                <Link to={url} className="flex items-center gap-4 py-3 px-3 rounded-xl
                                     hover:bg-blue-600 hover:text-white text-gray-500
                                     transition-all duration-200 group-active:scale-95">
                                    <Icon size={20} className="shrink-0" />
                                    {sidebarOpen && <span className="font-medium whitespace-nowrap">{name}</span>}
                                </Link>

                                
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout Section */}
                <div className="p-3 border-t border-gray-200">
                    <div className="relative group">
                        <button className="flex items-center gap-4 cursor-pointer w-full
                                         py-3 px-3 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600 
                                         transition-all duration-200 group-active:scale-95">
                            <LogOut size={20} className="shrink-0" />
                            {sidebarOpen && <span className="font-medium">Logout</span>}
                        </button>

                        
                    </div>
                </div>
            </aside>

            
            <main className="flex-1 p-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </section>
    )
}

export default DashboardLayout