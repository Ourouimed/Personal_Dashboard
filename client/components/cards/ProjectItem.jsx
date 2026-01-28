import { ExternalLink, Github } from "lucide-react";
import { styles } from "../../lib/styles";
const ProjectItem = ({ item , onDelete , onUpdate}) => {
  return (
    <div className="p-3 rounded-lg bg-white shadow-lg flex flex-col justify-between">
      <div>
        <img
          src={item.image}
          alt={item.title}
          className="w-full aspect-video object-cover rounded-md mb-2"
        />
        <h4 className="text-2xl font-semibold leading-tight">{item.title}</h4>
        <p className="text-gray-700 text-sm mt-1">{item.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {item.tech.map((t) => (
            <span key={t} className="text-xs py-1 px-3 border border-gray-300 rounded-md bg-gray-50">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Row: Links on left, Admin buttons on right */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3">
          {item.github && (
            <a 
              href={item.github} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              title="GitHub Repository"
            >
              <Github size={20} />
            </a>
          )}
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className={styles.button} onClick={onUpdate}>
            update
          </button>
          <button className={`${styles.button} !bg-red-500 text-white`} onClick={onDelete}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;