'use client';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { PrimaryButton } from '../components/Button';

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      setErr(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) throw new Error('Not logged in');
        const res = await fetch(`${backend}/promotions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPromotions(data.results || []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (backend) fetchPromotions();
  }, [backend]);

  return (
    <div className={styles.pageContainer}>
      <main>
        <h1>Promotions</h1>

        <div style={{ marginBottom: 16 }}>
          <PrimaryButton text="Create Promotion" onClick={() => window.location.href = '/promotion/create'} />
        </div>

        <div className={styles.resultsContainer}>
          {loading && <div>Loading…</div>}
          {err && <div style={{ color: 'red' }}>Error: {err}</div>}
          {!loading && !err && promotions.length === 0 && <div>No promotions found</div>}

          {!loading && !err && promotions.map(p => (
            <div key={p.id} className={styles.resultsCard}>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontSize: 12, textTransform: 'uppercase' }}>{p.type}</span>
                </div>
                <div style={{ fontSize: 14, display: 'grid', gap: 4 }}>
                  <div><strong>Start:</strong> {p.startTime ? new Date(p.startTime).toLocaleString() : '—'}</div>
                  <div><strong>End:</strong> {p.endTime ? new Date(p.endTime).toLocaleString() : '—'}</div>
                  {p.description && <div><strong>Description:</strong> {p.description}</div>}
                  {p.minSpending != null && <div><strong>Min Spend:</strong> {p.minSpending}</div>}
                  {p.rate != null && <div><strong>Rate:</strong> {p.rate}</div>}
                  {p.points != null && <div><strong>Points:</strong> {p.points}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}