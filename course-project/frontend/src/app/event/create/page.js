'use client';
import { PrimaryButton } from "@/app/components/Button";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "../event.module.css";

/* Manager only page to create events*/

export default function CreateEvent() {

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [capacity, setCapacity] = useState("");
    const [points, setPoints] = useState(0);

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    async function handleSend() {
        setMessage("");
        setError(false);

        if (!backend) { setError(true); setMessage('Backend URL not configured'); return; }
        if (!eventName.trim()) { setError(true); setMessage('Name required'); return; }
        if (!description.trim()) { setError(true); setMessage('Description required'); return; }
        if (!location.trim()) { setError(true); setMessage('Location required'); return; }
        if (!startTime || !endTime) { setError(true); setMessage('Start & End time required'); return; }
        if (!points || Number(points) <= 0 || !Number.isInteger(Number(points))) { setError(true); setMessage('Points must be positive integer'); return; }
        if (!capacity || Number(points) <= 0 || !Number.isInteger(Number(points))) { setError(true); setMessage('Event capacity must be positive integer'); return; }


        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start) || isNaN(end)) { setError(true); setMessage('Invalid dates'); return; }
        if (end <= start) { setError(true); setMessage('End must be after start'); return; }

        const payload = {
            name: eventName.trim(),
            description: description.trim(),
            location: location.trim(),
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            capacity: Number(capacity),
            points: Number(points)
        };

        try {
            setSubmitting(true);
            // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            // if (!token) { setError(true); setMessage('Not logged in'); return; }

            const res = await fetch(`${backend}/events`, {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
            let body;
            try { body = await res.json(); } catch { body = {}; }
            if (!res.ok) {
                setError(true);
                setMessage(body.error || body.message || `Create failed (${res.status})`);
                return;
            }
            setMessage('Event created');
            setTimeout(() => router.push('/event'), 800);
        } catch (e) {
            setError(true);
            setMessage(e.message || 'Create failed');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="main-container">
            <h1>Create Event</h1>

            <div className={styles.createForm}>

                {/* Event name */}
                <div className={styles.fullWidthInput}>
                    <h5>Event Name</h5>
                    <input 
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                {/* Description */}
                <div className={styles.fullWidthInput}>
                    <h5>Description</h5>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                {/* Location */}
                <div className={styles.fullWidthInput}>
                    <h5>Location</h5>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                {/* Two-column section */}
                <div className={styles.columns}>
                    {/* Left column */}
                    <div className={styles.column}>
                        
                        <h5>Start Time</h5>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            disabled={submitting}
                        />

                        <h5>Capacity</h5>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            disabled={submitting}
                        />
                    </div>

                    {/* Right column */}
                    <div className={styles.column}>
                        <h5>End Time</h5>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            disabled={submitting}
                        />

                        <h5>Points</h5>
                        <input
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(e.target.value)}
                            disabled={submitting}
                        />
                    </div>
                </div>

                <div className={styles.formActions}>
                    <p className={`${styles.message} ${error ? styles.error : styles.success}`}>
                        {message}
                    </p>
                    <PrimaryButton className="submit" text={submitting ? 'Creating...' : 'Create'} onClick={handleSend} disabled={submitting}/>
                </div>
            </div>
        </div>
    );
}
