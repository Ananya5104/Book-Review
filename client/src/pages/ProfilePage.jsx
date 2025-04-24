import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, reset } from '../redux/slices/authSlice';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { name, email, password, confirmPassword } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage('Profile updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);
  
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password && password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    if (password && password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    
    const userData = {
      name,
      email,
    };
    
    if (password) {
      userData.password = password;
    }
    
    dispatch(updateProfile(userData));
  };
  
  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <h1>Profile</h1>
          <p>Update your information</p>
          
          {validationError && <Alert type="danger" message={validationError} />}
          {isError && <Alert type="danger" message={message} />}
          {successMessage && <Alert type="success" message={successMessage} />}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>
            
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
