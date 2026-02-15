import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { sidebar } from "../lib/links"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, LogOut, Menu, X } from "lucide-react" // Added Menu/X icons
import { useDispatch, useSelector } from "react-redux"
import { logout, verifySession } from "../store/features/auth/authSlice"

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isInitialized } = useSelector(state => state.auth)
    const location = useLocation()

    useEffect(() => {
        if (!isInitialized) {
            dispatch(verifySession());
        }
    }, [dispatch, isInitialized]);

    useEffect(() => {
        if (!user && isInitialized) {
            navigate('/login')
        };
    }, [user, isInitialized, navigate]);

    // Close sidebar automatically when user clicks a link on mobile
    const handleLinkClick = () => {
        if (window.innerWidth < 768) setSidebarOpen(false);
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <section className="flex flex-col md:flex-row bg-gray-100 min-h-screen relative">
            
            
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-9 md:hidden" 
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen bg-white shadow-xl z-9
                transition-all duration-300 ease-in-out flex flex-col
                ${sidebarOpen ? 'w-[250px] translate-x-0' : 'w-[70px] -translate-x-full md:translate-x-0'}
            `}>
                
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    {(sidebarOpen || window.innerWidth < 768) && (
                        <h4 className="font-bold text-gray-800 truncate px-2">Ourouimed</h4>
                    )}
                    <button 
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 
                                   flex items-center justify-center cursor-pointer transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        
                        <span className="md:hidden">{sidebarOpen ? <X size={18}/> : <Menu size={18}/>}</span>
                        <span className="hidden md:block">{sidebarOpen ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}</span>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
                    <ul className="space-y-2">
                        {sidebar.map(({ name, icon: Icon, url }) => (
                            <li key={name} className="relative group">
                                <Link 
                                    to={url} 
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-4 py-3 px-3 rounded-xl
                                     transition-all duration-200 group-active:scale-95 
                                     ${location.pathname === url 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}`}
                                >
                                    <Icon size={20} className="shrink-0"/>
                                    {(sidebarOpen) && <span className="font-medium whitespace-nowrap">{name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout Section */}
                <div className="p-3 border-t border-gray-200">
                    <button className="flex items-center gap-4 cursor-pointer w-full
                                       py-3 px-3 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600 
                                       transition-all duration-200 group-active:scale-95"
                                       onClick={handleLogout}>
                        <LogOut size={20} className="shrink-0" />
                        {sidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            
            <main className="flex-1 overflow-x-hidden">
                        
                <header className="flex  py-2 items-center gap-2 px-4 md:hidden border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        {/* Sidebar Trigger Button */}
                        <button 
                        onClick={() => setSidebarOpen(true)}
                        className="flex size-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                        >
                            <Menu size={16} />
                        </button>

                        {/* Vertical Separator */}
                        <div className="h-4 w-[1px] bg-gray-300 mx-1" />

                       
                        <span className="text-gray-600 hover:text-black transition duration-300">
                            {location.pathname.split('/')[1] || 'Home'}
                        </span>
                    </div>
                </header>


                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </section>
    )
}

export default DashboardLayout