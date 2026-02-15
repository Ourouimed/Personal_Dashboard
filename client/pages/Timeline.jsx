import { Plus, Loader2 } from "lucide-react";
import Popup from "../components/Popup";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../lib/styles";
import { getTimeLine } from "../store/features/timeline/timelineSlice";
import AddTimeLinePopup from "../components/popus-forms/AddTimelinePopup";
import TimelineItem from "../components/cards/TimelineItem"; 
import DeleteTimeLinePopup from "../components/popus-forms/DeleteTimeLinePopup";
import UpdateTimeLinePopup from "../components/popus-forms/UpdateTimeLinePopup";

const Timeline = () => {
  const dispatch = useDispatch();
  const { isLoading, timeline } = useSelector(state => state.timeline);
  
  const [filter, setFilter] = useState('all'); 

  const [popupData, setPopupData] = useState({
    isOpen: false,
    title: null,
    content: null
  });

  useEffect(() => {
    dispatch(getTimeLine());
  }, [dispatch]);

  const filteredTimeline = useMemo(() => {
    if (!timeline) return [];
    if (filter === 'all') return timeline;
    return timeline.filter(item => item.type?.toLowerCase() === filter.toLowerCase());
  }, [timeline, filter]);

  const handleClosePopup = () => setPopupData({ isOpen: false, title: null, content: null });

  const handleOpenAddTimeLinePopup = () => {
    setPopupData({
      isOpen: true,
      title: 'Add Timeline Entry',
      content: <AddTimeLinePopup onClose={handleClosePopup} />
    });
  };

  const handleOpenDeleteTimeLinePopup = (id) => {
    setPopupData({ isOpen: true, title: 'Delete Entry', content: <DeleteTimeLinePopup id={id} onClose={handleClosePopup} /> });
  };

  const handleOpenUpdateTimeLinePopup = (t) => {
    setPopupData({ isOpen: true, title: 'Update Entry', content: <UpdateTimeLinePopup onClose={handleClosePopup} timeline={t} /> });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Experience & Education</h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 mr-2">
            {['all', 'work', 'education'].map((type) => (
              <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 cursor-pointer py-1 text-xs sm:text-sm font-semibold rounded-md transition-all capitalize ${
                                filter === type
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {type}
                        </button>
            ))}
          </div>

          <button className={`${styles.button} text-sm`} onClick={handleOpenAddTimeLinePopup}>
            Add <Plus size={16} />
          </button>
        </div>
      </div>

      {popupData.isOpen && (
        <Popup title={popupData.title} onClose={handleClosePopup}>
          {popupData.content}
        </Popup>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin mb-2" />
          <p>Fetching timeline...</p>
        </div>
      ) : filteredTimeline.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl text-gray-400">
          No {filter !== 'all' ? filter : ''} entries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTimeline.map((item) => (
            <TimelineItem 
              key={item._id} 
              item={item} 
              onDelete={() => handleOpenDeleteTimeLinePopup(item._id)} 
              onUpdate={() => handleOpenUpdateTimeLinePopup(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;