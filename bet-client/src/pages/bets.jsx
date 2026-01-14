import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetsBySupabaseId, createBet } from '../Slices/betSlice';

export default function Bets({ user }) {
  const dispatch = useDispatch();
  const { items: bets, loading, error } = useSelector(s => s.bets);
  const [formData, setFormData] = useState({
    prediction: '',
    amount: '',
    possibleWin: 0,
    isAccepted: false,
    status: 'pending'
  });

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchBetsBySupabaseId(user.id));
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && user.id) {
      const payload = {
        ...formData,
        supabaseId: user.id,
        amount: parseFloat(formData.amount),
        possibleWin: parseFloat(formData.possibleWin)
      };
      dispatch(createBet(payload));
      setFormData({
        prediction: '',
        amount: '',
        possibleWin: 0,
        isAccepted: false,
        status: 'pending'
      });
    }
  };

  return (
    <div className="page">
      <h1>My Bets</h1>
      <div className="create-bet">
        <h2>Create New Bet</h2>
        <form onSubmit={handleSubmit} className="bet-form">
          <div className="form-group">
            <label htmlFor="prediction">Prediction</label>
            <textarea
              id="prediction"
              name="prediction"
              value={formData.prediction}
              onChange={handleChange}
              placeholder="Enter your prediction"
              required
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              min="0"
              step="0.01"
            />
          </div>
          <button type="submit" className="btn" disabled={loading || !user}>
            {loading ? 'Creating...' : 'Create Bet'}
          </button>
        </form>
      </div>
      {error && <p className="error">{typeof error === 'string' ? error : error.message || 'Error'}</p>}
      <div className="bets-list">
        <h2>Your Bets</h2>
        {loading && <p>Loading...</p>}
        {bets.length === 0 && !loading && <p>No bets found.</p>}
        {bets.map(bet => (
          <div key={bet._id || bet.id} className="bet-item">
            <p><strong>Prediction:</strong> {bet.prediction}</p>
            <p><strong>Amount:</strong> ${bet.amount}</p>
            <p><strong>Possible Win:</strong> ${bet.possibleWin}</p>
            <p><strong>Accepted:</strong> {bet.isAccepted ? 'Yes' : 'No'}</p>
            <p><strong>Status:</strong> {bet.status}</p>
            <p><strong>Created:</strong> {new Date(bet.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

