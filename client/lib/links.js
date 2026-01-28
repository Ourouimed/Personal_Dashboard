import { Briefcase, LayoutDashboard, List } from 'lucide-react'
export const sidebar = [
    {
        name : 'Dashboard' ,
        icon : LayoutDashboard ,
        url : '/'
    } ,
    {
        name : 'To do list' ,
        icon : List ,
        url : '/to-do'
    },
    {
        name : 'Projects' ,
        icon : Briefcase ,
        url : '/projects'
    },
]