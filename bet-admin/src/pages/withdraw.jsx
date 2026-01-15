import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWithdrawals, updateWithdrawal } from '../Slices/withdrawalSlice';

const Withdraw = () => {
  const dispatch = useDispatch();
  const { items: withdrawals, loading, error } = useSelector(state => state.withdrawals);

  useEffect(() => {
    dispatch(fetchWithdrawals());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateWithdrawal({ id, data: { status: newStatus } }));
  };

  return (
    <div className="page">
      <h1>Withdrawal Management</h1>
      <p>Manage all user withdrawals.</p>
      {error && <p className="error">{typeof error === 'string' ? error : error.message || 'An error occurred'}</p>}
      {loading ? (
        <p>Loading withdrawals...</p>
      ) : withdrawals.length === 0 ? (
        <p>No withdrawals found.</p>
      ) : (
        <div className="withdrawals-table">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Phone No</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map(withdrawal => (
                <tr key={withdrawal._id}>
                  <td>{withdrawal.userName}</td>
                  <td>{withdrawal.phoneNo}</td>
                  <td>{withdrawal.method}</td>
                  <td>${withdrawal.amount}</td>
                  <td>
                    <span className={`status ${withdrawal.status}`}>{withdrawal.status}</span>
                  </td>
                  <td>{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={withdrawal.status}
                      onChange={(e) => handleStatusChange(withdrawal._id, e.target.value)}
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

export default Withdraw;
