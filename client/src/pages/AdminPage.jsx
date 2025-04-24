import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../redux/slices/bookSlice';
import BookForm from '../components/admin/BookForm';
import BookTable from '../components/admin/BookTable';

function AdminPage() {
  const [bookToEdit, setBookToEdit] = useState(null);
  const [activeTab, setActiveTab] = useState('manage');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleEdit = (book) => {
    // Reset the Redux state to clear any previous success/error states
    dispatch(reset());
    setBookToEdit(book);
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user || !user.isAdmin) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => {
              dispatch(reset());
              setActiveTab('add');
            }}
          >
            {bookToEdit ? 'Edit Book' : 'Add Book'}
          </button>
          <button
            className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => {
              dispatch(reset());
              setActiveTab('manage');
              setBookToEdit(null);
            }}
          >
            Manage Books
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'add' ? (
            <BookForm bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} />
          ) : (
            <BookTable onEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
