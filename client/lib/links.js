import { Briefcase, Check, CheckSquare, LayoutDashboard, List, Timer } from 'lucide-react'
export const sidebar = [
    {
        name : 'Dashboard' ,
        icon : LayoutDashboard ,
        url : '/'
    } ,
    {
        name : 'To do list' ,
        icon : CheckSquare ,
        url : '/todos'
    },
    {
        name : 'Projects' ,
        icon : Briefcase ,
        url : '/projects'
    },
    {
        name : 'Timeline' ,
        icon : Timer ,
        url : '/timeline'
    },
]