'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../components/Button.js';
import styles from './LoginForm.module.css';
import colors from '../constants/colors.js';

export default function LoginForm() {
  const [utorid, setUtorid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        await login(utorid.trim(), password);
        router.push("/"); // TODO: change to home page
    } catch (err) {
        setError(err?.message || 'Login failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ '--primary': colors.primary, '--muted': colors.muted }}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>

        <form className={styles.form} onSubmit={submit} noValidate>
          <label className={styles.label}>
            UTORid
            <input
              className={styles.input}
              value={utorid}
              onChange={(e) => setUtorid(e.target.value)}
              placeholder="e.g. smithb1"
              autoComplete="username"
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <Button disabled={loading} onClick={submit}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}