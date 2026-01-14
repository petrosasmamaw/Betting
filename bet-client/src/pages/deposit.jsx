import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDeposit } from '../Slices/depositSlice';

const Deposit = ({ user }) => {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.deposits);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && amount) {
      dispatch(createDeposit({ amount: parseFloat(amount), userId: user._id }));
      setAmount('');
    }
  };

  return (
    <div className="page">
      <h1>Deposit</h1>
      <p>Make a deposit to your account.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to deposit"
            required
            min="0"
            step="0.01"
          />
        </div>
        {error && <p className="error">{typeof error === 'string' ? error : error.message || 'An error occurred'}</p>}
        <button type="submit" className="btn" disabled={loading || !user}>
          {loading ? 'Depositing...' : 'Deposit'}
        </button>
      </form>
    </div>
  );
};

export default Deposit;