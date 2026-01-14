import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBets } from '../Slices/betSlice';

export default function Bets({ user }) {
  const dispatch = useDispatch();
  const bets = useSelector(s => s.bets);

  useEffect(() => { dispatch(fetchBets()); }, [dispatch]);

  return (
    <div className="page">
      <h1>Bets</h1>
      {bets.loading && <div>Loading...</div>}
      <ul className="list">
        {bets.items.map(b => (
          <li key={b._id || b.id}>{b.title || b._id}</li>
        ))}
      </ul>
    </div>
  );
}

