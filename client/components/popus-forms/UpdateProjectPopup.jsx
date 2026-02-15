import { useState, useRef } from "react";
import { X, Plus, Image as ImageIcon, UploadCloud, AlertCircle, Loader2 } from "lucide-react";
import { styles } from "../../lib/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../store/features/projects/projectSlice";

const UpdateProjectPopup = ({ project ,  onClose }) => {
  const [projectInfo, setProjectInfo] = useState({
    title: project.title || "",
    description: project.description || '',
    category: project.category || 'frontend', 
    link: project.link || '',
    github: project.github || '',
    image: project.image || null,
    tech: project.tech || [] 
  });

  const [imagePreview, setImagePreview] = useState(project.image); 
  const [errors, setErrors] = useState({});
  const [currentTech, setCurrentTech] = useState('');


  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.projects)
  
  const fileInputRef = useRef(null);
  const categories = ['full stack', 'frontend', 'backend'];

  // Validation Logic 
  const validateForm = () => {
    let newErrors = {};
    if (!projectInfo.title.trim()) newErrors.title = "Title is required";
    if (!projectInfo.description.trim()) newErrors.description = "Description is required";
    if (projectInfo.tech.length === 0) newErrors.tech = "Add at least one tech";
    if (!projectInfo.image) newErrors.image = "Please upload a cover image";
    
    // URL Validation
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (projectInfo.github && !urlRegex.test(projectInfo.github)) newErrors.github = "Invalid GitHub URL";
    if (projectInfo.link && !urlRegex.test(projectInfo.link)) newErrors.link = "Invalid Demo URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "Image must be under 2MB" }));
        return;
      }
      setProjectInfo(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProjectInfo(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  const addTech = (e) => {
    if (e.key === 'Enter' && currentTech.trim()) {
      e.preventDefault();
      if (!projectInfo.tech.includes(currentTech.trim())) {
        setProjectInfo(prev => ({ ...prev, tech: [...prev.tech, currentTech.trim()] }));
        setErrors(prev => ({ ...prev, tech: null }));
      }
      setCurrentTech('');
    }
  };

  const removeTech = (index) => {
    setProjectInfo(prev => ({ ...prev, tech: prev.tech.filter((_, i) => i !== index) }));
  };

  const handleUpdateProject = async (e) => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", projectInfo.title);
    formData.append("description", projectInfo.description);
    formData.append("category", projectInfo.category);
    formData.append("github", projectInfo.github);
    formData.append("link", projectInfo.link);
    formData.append("image", projectInfo.image); 
    projectInfo.tech.forEach(t => formData.append("tech", t));

    try {
        await dispatch(updateProject({...projectInfo, id : project._id})).unwrap()
        onClose();
    }
    catch (err) {
      setErrors({ submit: "Failed to connect to server" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Image Upload Field */}
        <div className="space-y-1 md:col-span-2">
          <label className={styles.label}>Project Cover Image</label>
          <div 
            onClick={() => fileInputRef.current.click()}
            className={`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group overflow-hidden h-40 
              ${errors.image ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'}`}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-white text-sm font-medium flex items-center gap-2"><UploadCloud size={20}/> Change Image</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-gray-100 rounded-full text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-100 transition-colors">
                  <ImageIcon size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600">Click to upload</p>
                  <p className="text-xs text-gray-400">Max 2MB</p>
                </div>
              </>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={12}/> {errors.image}</p>}
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>

        {/* Title */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="title" className={styles.label}>Title</label>
          <input id='title' className={`${styles.input} ${errors.title ? 'border-red-400' : ''}`} onChange={handleChange} value={projectInfo.title} placeholder="e.g., YallaFantasy" />
          {errors.title && <p className="text-red-500 text-[10px]">{errors.title}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="category" className={styles.label}>Category</label>
          <select id="category" value={projectInfo.category} onChange={handleChange} className={styles.input}>
            {categories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
        </div>

        {/* Tech Stack */}
        <div className="space-y-1 md:col-span-2">
          <label className={styles.label}>Tech Stack</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {projectInfo.tech.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded border border-blue-100">
                {t} <button type="button" onClick={() => removeTech(i)} className="cursor-pointer hover:text-red-500"><X size={12}/></button>
              </span>
            ))}
          </div>
          <input 
            value={currentTech} 
            onChange={(e) => setCurrentTech(e.target.value)} 
            onKeyDown={addTech} 
            className={`${styles.input} ${errors.tech ? 'border-red-400' : ''}`} 
            placeholder="Add tech (Enter to add)" 
          />
          {errors.tech && <p className="text-red-500 text-[10px]">{errors.tech}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea id='description' rows="3" className={`${styles.input} resize-none ${errors.description ? 'border-red-400' : ''}`} onChange={handleChange} value={projectInfo.description} placeholder="Tell us about the project..." />
          {errors.description && <p className="text-red-500 text-[10px]">{errors.description}</p>}
        </div>

        {/* Links */}
        <div className="space-y-1">
          <label htmlFor="github" className={styles.label}>Github URL</label>
          <input id='github' className={`${styles.input} ${errors.github ? 'border-red-400' : ''}`} onChange={handleChange} value={projectInfo.github} />
          {errors.github && <p className="text-red-500 text-[10px]">{errors.github}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="link" className={styles.label}>Live Demo</label>
          <input id='link' className={`${styles.input} ${errors.link ? 'border-red-400' : ''}`} onChange={handleChange} value={projectInfo.link} />
          {errors.link && <p className="text-red-500 text-[10px]">{errors.link}</p>}
        </div>
      </div>

      {errors.submit && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">{errors.submit}</div>}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 flex-wrap">
        <button type="button" onClick={onClose} className="text-sm py-2 px-4 text-gray-600 border cursor-pointer border-gray-300 rounded-lg font-semibold transition">
          Cancel
        </button>
        <button 
            onClick={handleUpdateProject} 
            disabled={isLoading}
            className={`${styles.button} text-sm`}
        >
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14}/>}
          {isLoading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </div>
  );
}

export default UpdateProjectPopup;