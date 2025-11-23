'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PrimaryButton } from '../../components/Button';
import Notification from '../../components/Notification';
import styles from './page.module.css';

export default function AddGuestsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newGuestUtorid, setNewGuestUtorid] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');

    const backendURL = 'http://localhost:4000';

    const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'success' });
    const showNotification = (message, type = 'success') => setNotification({ isVisible: true, message, type });
    const closeNotification = () => setNotification(prev => ({ ...prev, isVisible: false }));

    const eventId = typeof window !== 'undefined' ? localStorage.getItem('eventId') : null;

    // Fetch events 
    const fetchEvent = async () => {
        try {
            const res = await fetch(`${backendURL}/events/${eventId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to fetch event');
            }
            const data = await res.json();
            setEvent(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!eventId || !user) return;
        fetchEvent();
    }, [eventId, user]);

    // Only managers and supervisors can remove guests
    const isManagerOrSuperuser = ['manager', 'superuser'].includes(user?.role);
    const canRemove = isManagerOrSuperuser;

    // Add guest
    const handleAddGuest = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        try {
            const res = await fetch(`${backendURL}/events/${eventId}/guests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ utorid: newGuestUtorid.trim() })
            });
            const data = await res.json();

            if (res.ok) {
                showNotification(`${data.guestAdded.name} added! (Guest ID: ${data.id}; User ID: ${data.guestAdded.id})`);
                setNewGuestUtorid('');
                await fetchEvent();
            } else {
                showNotification(data.error || 'Failed to add guest.', 'error');
            }
        } catch {
            showNotification('Try again later.', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    // Remove Guest
    const handleRemoveGuest = async () => {
        if (!selectedUserId || !canRemove) return;
        setActionLoading(true);

        try {
            const res = await fetch(`${backendURL}/events/${eventId}/guests/${selectedUserId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (res.status === 204 || res.ok) {
                showNotification('Guest removed!', 'success');
                setSelectedUserId('');
                await fetchEvent();
            } else {
                const data = await res.json();
                showNotification(data.error || 'Failed to remove guest', 'error');
            }
        } catch {
            showNotification('Server error. Try again later.', 'error');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!event) return <p>Event details not available.</p>;

    const guestOptions = (event.guests || [])
    .filter(g => g.userId != null)
    .map(g => ({
        label: `User ID: ${g.userId}`,
        value: String(g.userId)
    }));

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                {/* <button className={styles.backButton} onClick={() => router.back()}>
                    ← Back to Event
                </button> */}
                <h1>Manage Guests for {event.name}</h1>
            </div>

            <section className={styles.formSection}>
                <h3>Add Guest</h3>
                <form onSubmit={handleAddGuest} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Enter UTORID"
                        value={newGuestUtorid}
                        onChange={(e) => setNewGuestUtorid(e.target.value)}
                        required
                        className={styles.input}
                        disabled={actionLoading}
                    />
                    <PrimaryButton
                        text={actionLoading ? 'Adding...' : 'Add'}
                        type="submit"
                        disabled={actionLoading || !newGuestUtorid}
                    />
                </form>
            </section>

            {canRemove && (
                <section className={styles.formSection}>
                    <h3>Remove Guest</h3>
                    <div className={styles.form}>
                        <select
                            className={styles.dropdown}
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            disabled={actionLoading || guestOptions.length === 0}
                        >
                            <option value="">Select Guest by User ID</option>
                            {guestOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <PrimaryButton
                            text={actionLoading ? 'Removing...' : 'Remove'}
                            onClick={handleRemoveGuest}
                            className={styles.removeButton}
                            disabled={actionLoading || !selectedUserId}
                        />
                    </div>
                </section>
            )}

            <Notification
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={closeNotification}
                type={notification.type}
            />
        </main>
    );
}
