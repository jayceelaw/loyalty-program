'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PrimaryButton } from '../../components/Button';
import Notification from '../../components/Notification';
import TextBox from '../../components/TextBox';
import styles from '../event.module.css';

export default function AwardGuestPage() {
    const router = useRouter();
    const { user } = useAuth();
    // Get eventId from storage cause I still haven't figure out [id]
    const eventId = typeof window !== 'undefined' ? localStorage.getItem('eventId') : null;
    const [utorid, setUtorid] = useState('');
    const [amount, setAmount] = useState('');
    const [remark, setRemark] = useState('');
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const backendURL = 'http://localhost:4000';

    const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'success' });
    const showNotification = (message, type) => setNotification({ isVisible: true, message, type });
    const closeNotification = () => setNotification(prev => ({ ...prev, isVisible: false }));

    // Fetch event
    const fetchEvent = async () => {
        if (!eventId) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${backendURL}/events/${eventId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to load event. ');
            }
            const data = await res.json();
            setEvent(data);
        } catch (err) {
            showNotification(`Error fetching event: ${err.message}`, 'error');
            setEvent(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (eventId && user) {
            fetchEvent();
        } else if (!eventId) {
            setLoading(false);
        }
    }, [eventId, user]);

    // Award points
    const handleAwardPoints = async () => {
        if (isSubmitting) return;

        const points = parseInt(amount, 10);

        setIsSubmitting(true);
        closeNotification();

        const payload = {
            type: 'event',
            amount: points,
        };

        //utorid is optional 
        if (utorid) {
            payload.utorid = utorid;
        }

        // remark is also optional 
        if (remark) {
            payload.remark = remark;
        }

        try {
            const res = await fetch(`${backendURL}/events/${eventId}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                let successMessage;
                if (utorid) {
                    successMessage = `Awarded ${data.awarded} points to UTORid: ${data.recipient}.`;
                } else if (Array.isArray(data)) {
                    successMessage = `Awarded ${points} points to ${data.length} guests.`;
                } else {
                    successMessage = `Points awarded!`;
                }

                showNotification(successMessage, 'success');
                setUtorid('');
                setAmount('');
                setRemark('');
                fetchEvent();
            } else {
                showNotification(`Error: ${data.error || 'Failed to award points.'}`, 'error');
            }
        } catch (err) {
            showNotification('Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }

    };

    if (loading) return <p>Loading event details...</p>;

    if (!event) return <p>Error: Could not load event details for ID {eventId}.</p>;

    // button
    const isAwardingAll = utorid.trim() === '';
    const displayAmount = amount || '0';
    const buttonText = isAwardingAll
        ? `Award ${displayAmount} Points to All Guests`
        : `Award ${displayAmount} Points to Guest ${utorid.trim()}`;

    return (
        <main className={styles.container}> 
            <div className={styles.awardPointsWrapper}>
                <h1>Award Points for {event.name}</h1>

                <p className={styles.pointsStatus}>
                    Total Points Remaining: {event.pointsRemain}
                </p>

                <div className={styles.awardFormSection}>
                    <label htmlFor="utorid">Guest UTORID (Leave empty to award all confirmed guests):</label>
                    <input
                        id="utorid"
                        type="text"
                        value={utorid}
                        onChange={(e) => setUtorid(e.target.value)}
                        placeholder="UTORID"
                        className={styles.awardInputField}
                    />

                    <label htmlFor="amount">Points:</label>
                    <input
                        id="amount"
                        type="number"
                        min="1"
                        step="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Enter Amount"
                        className={styles.awardInputField}
                    />

                    <label htmlFor="remark">Remark (Optional):</label>
                    <TextBox
                        id="remark"
                        value={remark}
                        onChange={setRemark}
                        placeholder=" "
                        rows={2}
                    />

                    <PrimaryButton
                        text={buttonText}
                        onClick={handleAwardPoints}
                        className={styles.awardButton}
                        disabled={isSubmitting || !amount || parseInt(amount, 10) <= 0}
                    />
                </div>
            </div>

            <Notification
                message={notification.message}
                isVisible={notification.isVisible}
                onClose={closeNotification}
                type={notification.type}
            />
        </main>
    );
}