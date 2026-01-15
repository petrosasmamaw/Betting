import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeposits, updateDeposit } from '../Slices/depositSlice';

const Deposit = () => {
  const dispatch = useDispatch();
  const { items: deposits, loading, error } = useSelector(state => state.deposits);

  useEffect(() => {
    dispatch(fetchDeposits());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateDeposit({ id, data: { status: newStatus } }));
  };

  return (
    <div className="page">
      <h1>Deposit Management</h1>
      <p>Manage all user deposits.</p>
      {error && <p className="error">{typeof error === 'string' ? error : error.message || 'An error occurred'}</p>}
      {loading ? (
        <p>Loading deposits...</p>
      ) : deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <div className="deposits-table">
          <table>
            <thead>
              <tr>
                <th>Phone No</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map(deposit => (
                <tr key={deposit._id}>
                  <td>{deposit.phoneNo}</td>
                  <td>${deposit.amount}</td>
                  <td>{deposit.method}</td>
                  <td>
                    <span className={`status ${deposit.status}`}>{deposit.status}</span>
                  </td>
                  <td>{new Date(deposit.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={deposit.status}
                      onChange={(e) => handleStatusChange(deposit._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Deposit;