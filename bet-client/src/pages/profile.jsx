import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBySupabaseId, createUser } from '../Slices/userSlice';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { items: users, loading, error } = useSelector(state => state.users);

  const currentUser = Array.isArray(users) ? users.find(u => u.supabaseId === user?.id) || {} : users;

  useEffect(() => {
    if (user && user.id) {
      // First check if user exists by fetching
      dispatch(fetchUserBySupabaseId(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!loading && user && user.id && user.email) {
      const hasUser = Array.isArray(users) && users.length > 0;
      if (!hasUser && error) {
        const errorMessage = typeof error === 'string' ? error : error?.message || '';
        if (errorMessage.includes('User not found') || errorMessage.includes('not found')) {
          // User doesn't exist, create it
          dispatch(createUser({
            supabaseId: user.id,
            email: user.email
          }));
        }
      }
    }
  }, [loading, error, users, user, dispatch]);

  return (
    <div className="page">
      <h1>Profile</h1>
      <p>View your profile information here.</p>
      {error && !error.includes('User not found') && !error.includes('not found') && (
        <p className="error">{typeof error === 'string' ? error : error.message || 'An error occurred'}</p>
      )}
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <div className="profile-info">
          <div className="profile-field">
            <label>Email:</label>
            <span>{user?.email || currentUser.email || 'Not set'}</span>
          </div>
          <div className="profile-field">
            <label>Role:</label>
            <span>{currentUser.role || 'user'}</span>
          </div>
          <div className="profile-field">
            <label>Balance:</label>
            <span>${currentUser.balance || 0}</span>
          </div>
          <div className="profile-field">
            <label>Status:</label>
            <span className={currentUser.isBlocked ? 'blocked' : 'active'}>
              {currentUser.isBlocked ? 'Blocked' : 'Active'}
            </span>
          </div>
          <div className="profile-field">
            <label>Member Since:</label>
            <span>{currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
