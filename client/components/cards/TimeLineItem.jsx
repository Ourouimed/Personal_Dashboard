import { Calendar, MapPin, Briefcase, GraduationCap, Trash2, Edit3, MoreHorizontal } from "lucide-react";

const TimeLineItem = ({ item, onUpdate, onDelete }) => {
  const { title, org, date, desc, location, type, _id } = item;
  const isWork = type === 'work';

  return (
    <div className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
     

      {/* Action Buttons - Visible on Hover */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => onUpdate(item)}
          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          title="Edit entry"
        >
          <Edit3 size={14} />
        </button>
        <button 
          onClick={() => onDelete(_id)}
          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
          title="Delete entry"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-start gap-2 mb-2 pr-16">
        <div className="space-y-1">
           <div className="flex items-center gap-2">
             {isWork ? <div className="bg-blue-500 p-3 rounded-md">
              <Briefcase size={16} className="text-white" />
              </div> : <div className="bg-purple-500 p-3 rounded-md">
                <GraduationCap size={16} className="text-white" />
                </div>}
             <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
               {title}
             </h3>
           </div>
           <p className="text-neutral-500 font-semibold">{org}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          <Calendar size={12} /> {date}
        </span>
      </div>
      
      <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {desc}
      </p>
      
      <div className="flex items-center gap-1 text-xs text-neutral-400 italic">
        <MapPin size={12} />
        {location}
      </div>
    </div>
  );
};

export default TimeLineItem;