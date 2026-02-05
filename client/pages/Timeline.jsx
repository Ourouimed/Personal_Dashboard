import { Plus, Loader2 } from "lucide-react";
import Popup from "../components/Popup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../lib/styles";
import { getTimeLine } from "../store/features/timeline/timelineSlice";
import AddTimeLinePopup from "../components/popus-forms/AddTimelinePopup";
import TimelineItem from "../components/cards/TimelineItem"; 
import DeleteTimeLinePopup from "../components/popus-forms/DeleteTimeLinePopup";
import UpdateTimeLinePopup from "../components/popus-forms/UpdateTimeLinePopup";

const Timeline = () => {
  const [popupData, setPopupData] = useState({
    isOpen: false,
    title: null,
    content: null
  });

  const dispatch = useDispatch();
  const { isLoading, timeline } = useSelector(state => state.timeline);

  useEffect(() => {
    dispatch(getTimeLine());
  }, [dispatch]);

  const handleClosePopup = () => setPopupData({ isOpen: false, title: null, content: null });

  const handleOpenAddTimeLinePopup = () => {
    setPopupData({
      isOpen: true,
      title: 'Add Timeline Entry',
      content: <AddTimeLinePopup onClose={handleClosePopup} />
    });
  };


  const handleOpenDeleteTimeLinePopup = (id)=>{
    setPopupData({isOpen : true , title : 'Delete project' , content : <DeleteTimeLinePopup id={id} onClose={handleClosePopup}/>})
  }
  
  
   const handleOpenUpdateTimeLinePopup = (t)=>{
     setPopupData({isOpen : true , title : 'Update project' , content : <UpdateTimeLinePopup onClose={handleClosePopup} timeline={t}/>})
    } 
  

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Experience & Education</h3>
        <button className={styles.button} onClick={handleOpenAddTimeLinePopup}>
          Add Timeline <Plus size={16} />
        </button>
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
      ) : !timeline || timeline.length === 0 ? ( 
        <div className="text-center py-20 border-2 border-dashed rounded-xl text-gray-400">
          No available timeline entries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeline.map((item) => (
            <TimelineItem key={item._id} item={item} onDelete={()=> handleOpenDeleteTimeLinePopup(item._id)} onUpdate={()=> handleOpenUpdateTimeLinePopup(item)}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;