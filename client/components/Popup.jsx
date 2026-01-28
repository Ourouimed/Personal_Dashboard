import { X } from "lucide-react";

const Popup = ({ title = '', onClose, children }) => {
  // Prevent clicks inside the modal from closing it
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div 
      className="fixed inset-0 z-50 p-4 md:p-10 bg-black/70 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose} // Close when clicking backdrop
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white flex flex-col shadow-2xl rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden"
        onClick={handleContentClick} // Prevent closing when clicking modal content
      >
        {/* Header - Fixed at top */}
        <div className="py-3 px-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            {title}
          </h3>

          <button 
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 
                                   flex items-center justify-center cursor-pointer transition duration-200" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18}/>
          </button>
        </div>

        {/* Content - Scrollable area */}
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;