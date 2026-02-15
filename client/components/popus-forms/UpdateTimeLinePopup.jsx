import { useState } from "react";
import { Plus, MapPin, Briefcase, GraduationCap, Calendar, Building2 } from "lucide-react";
import { styles } from "../../lib/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeLine } from "../../store/features/timeline/timelineSlice";

const UpdateTimeLinePopup = ({ timeline , onClose }) => {
  const [timelineInfo, setTimelineInfo] = useState({
    title: timeline.title || '',
    org: timeline.org || '',
    type: timeline.type || 'education',
    date: timeline.date || '',
    desc: timeline.desc || '',
    location: timeline.location || ''
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.projects);

  const validateForm = () => {
    let newErrors = {};
    if (!timelineInfo.title.trim()) newErrors.title = "Role/Title is required";
    if (!timelineInfo.org.trim()) newErrors.org = "Organization/School is required";
    if (!timelineInfo.date.trim()) newErrors.date = "Date range is required (e.g. 2021 - 2023)";
    if (!timelineInfo.desc.trim()) newErrors.desc = "Description is required";
    if (!timelineInfo.location.trim()) newErrors.location = "Location is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTimelineInfo(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleUpdateTimeLine = async (e) => {
    if (!validateForm()) return;

    try {
      await dispatch(updateTimeLine({...timelineInfo , id : timeline._id})).unwrap();
      onClose();
    } catch (err) {
      setErrors({ submit: "Failed to save timeline entry" });
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Type Selector (Work vs Education) */}
        <div className="md:col-span-2 flex p-1 bg-gray-100 rounded-lg">
          <button 
            onClick={() => setTimelineInfo(p => ({...p, type: 'work'}))}
            className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 rounded-md transition-all ${timelineInfo.type === 'work' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
          >
            <Briefcase size={16} /> Work
          </button>
          <button 
            onClick={() => setTimelineInfo(p => ({...p, type: 'education'}))}
            className={`flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 rounded-md transition-all ${timelineInfo.type === 'education' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
          >
            <GraduationCap size={16} /> Education
          </button>
        </div>

        {/* Title */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="title" className={styles.label}>Title / Position</label>
          <div className="relative">
            <input id='title' className={`${styles.input} ${errors.title ? 'border-red-400' : ''}`} onChange={handleChange} value={timelineInfo.title} placeholder="e.g., Software Engineer" />
          </div>
          {errors.title && <p className="text-red-500 text-[10px]">{errors.title}</p>}
        </div>

        {/* Organization */}
        <div className="space-y-1">
          <label htmlFor="org" className={styles.label}>Organization / School</label>
          <div className="relative flex items-center">
            <Building2 size={16} className="absolute left-3 text-gray-400" />
            <input id='org' className={`${styles.input} pl-10 ${errors.org ? 'border-red-400' : ''}`} onChange={handleChange} value={timelineInfo.org} placeholder="e.g., Google or University" />
          </div>
          {errors.org && <p className="text-red-500 text-[10px]">{errors.org}</p>}
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label htmlFor="location" className={styles.label}>Location</label>
          <div className="relative flex items-center">
            <MapPin size={16} className="absolute left-3 text-gray-400" />
            <input id='location' className={`${styles.input} pl-10 ${errors.location ? 'border-red-400' : ''}`} onChange={handleChange} value={timelineInfo.location} placeholder="e.g., Remote or NY" />
          </div>
          {errors.location && <p className="text-red-500 text-[10px]">{errors.location}</p>}
        </div>

        {/* Date */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="date" className={styles.label}>Date Duration</label>
          <div className="relative flex items-center">
            <Calendar size={16} className="absolute left-3 text-gray-400" />
            <input id='date' className={`${styles.input} pl-10 ${errors.date ? 'border-red-400' : ''}`} onChange={handleChange} value={timelineInfo.date} placeholder="e.g., Jan 2022 - Present" />
          </div>
          {errors.date && <p className="text-red-500 text-[10px]">{errors.date}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="desc" className={styles.label}>Description</label>
          <textarea id='desc' rows="3" className={`${styles.input} resize-none ${errors.desc ? 'border-red-400' : ''}`} onChange={handleChange} value={timelineInfo.desc} placeholder="Describe your responsibilities or achievements..." />
          {errors.desc && <p className="text-red-500 text-[10px]">{errors.desc}</p>}
        </div>
      </div>

      {errors.submit && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">{errors.submit}</div>}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={onClose} className="py-2 px-4 text-gray-600 border cursor-pointer border-gray-300 rounded-lg font-semibold transition hover:bg-gray-50">
          Cancel
        </button>
        <button 
            onClick={handleUpdateTimeLine} 
            disabled={isLoading}
            className={styles.button}
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18}/>}
          {isLoading ? 'Saving...' : 'Update Timeline'}
        </button>
      </div>
    </div>
  );
}

export default UpdateTimeLinePopup;