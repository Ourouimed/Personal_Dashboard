const StatItem = ({title , num , subText})=>{
    return <div className="p-4 border border-gray-300 rounded-lg space-y-2">
                        <h4 className="font-semibold text-sm text-gray-600">{title}</h4>
                        <p className="text-3xl font-bold">{num}</p>
                        {subText && <span className="text-xs text-gray-500">{subText}</span>}
                    </div>
}

export default StatItem