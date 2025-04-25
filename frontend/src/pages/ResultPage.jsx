import React, { useEffect, useState } from 'react';
import "./ResultPage.css";

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL+'/results');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch results');
        setResult(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);
  if (loading) return <p>Loading results...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div className='results-page'>
      <h2>🗳️ Election Result</h2>
      {result.topCandidate ? (
        <div className='result-declaration'>
          <p><strong>Winner : </strong> {result.topCandidate}</p>
          <p><strong>Total Votes : </strong> {result.voteCount}</p>
        </div>
      ) : (
        <p>{result.message}</p>
      )}
    </div>
  );
};