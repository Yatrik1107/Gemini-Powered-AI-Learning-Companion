import { FaPencilAlt, FaTrash } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note, deleteNote }) => {
  const navigate = useNavigate();
  
  // Format date and time
  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const formattedTime = new Date(note.date).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  // Navigate to edit page
  const handleEdit = () => {
    navigate(`/edit/${note.id}`);
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h2>{note.title}</h2>
        <div className="note-actions">
          <FaPencilAlt className="icon edit-icon" onClick={handleEdit} />
          <FaTrash className="icon delete-icon" onClick={() => deleteNote(note.id)} />
        </div>
      </div>
      <p>{note.content.substring(0, 100)}...</p> {/* Show first few lines of content */}
      <div className="note-footer">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default NoteItem;
