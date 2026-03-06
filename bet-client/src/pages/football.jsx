import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFootballMatches } from '../Slices/footballSlice';

const Football = ({ user }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.football || { items: [], status: 'idle', error: null });

  useEffect(() => {
    if (status === 'idle') dispatch(fetchFootballMatches());
  }, [dispatch, status]);

  return (
    <div className="page football-page">
      <h1 className="page-header">Live & Upcoming <span>Football</span> Matches</h1>
      <p className="page-description">Powered by your API key — browse recent matches and scores.</p>

      {status === 'loading' && <p className="loading">Loading matches…</p>}
      {status === 'failed' && <p className="error">{error}</p>}

      <div className="football-grid">
        {items && items.length > 0 ? (
          items.map((m) => (
            <div className="match-card" key={m.id || m.utcDate + m.homeTeam?.id}>
              <div className="match-header">
                <div className="competition">{m.competition?.name}</div>
                <div className="utc">{new Date(m.utcDate).toLocaleString()}</div>
              </div>
              <div className="match-body">
                <div className="team left">
                  <div className="team-name">{m.homeTeam?.name || m.homeTeam?.shortName}</div>
                </div>
                <div className="score">{m.score?.fullTime?.home ?? '-'} : {m.score?.fullTime?.away ?? '-'}</div>
                <div className="team right">
                  <div className="team-name">{m.awayTeam?.name || m.awayTeam?.shortName}</div>
                </div>
              </div>
              <div className="match-footer">Status: <span className="status-pill">{m.status}</span></div>
            </div>
          ))
        ) : (
          status === 'succeeded' && <p className="muted">No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default Football;
