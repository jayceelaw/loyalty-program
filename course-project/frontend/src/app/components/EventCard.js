'use client';

import { useRouter } from 'next/navigation';
import { PrimaryButton, SecondaryButton, BackButton } from './Button';
import styles from './EventCard.module.css';  

// Similar to TransactionCard

// Get event data 
export default function EventCard({
  id,
  name,
  location,
  startTime,
  endTime,
  capacity,
  numGuests
}) {
  const router = useRouter();

  const eventFull = numGuests >= capacity;

  const formatDateTime = (datetime) => {
    if (!datetime) return '';
    const d = new Date(datetime);
    return d.toLocaleString(); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.id}>ID: {id}</p>
        <p className={styles.name}>{name}</p>
      </div>

      <div className={styles.center}>
        {/* <p><span className={styles.label}>Location:</span> {location}</p> */}
        <p>
          <span className={styles.label}>Location:</span>{' '}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}  
          >
            {location}
          </a>
        </p>
        <p><span className={styles.label}>Start:</span> {formatDateTime(startTime)}</p>
        <p><span className={styles.label}>End:</span> {formatDateTime(endTime)}</p>
        <p>
          <span className={styles.label}>Spots Filled:</span> {numGuests}/{capacity} {eventFull ? '(Full)' : ''}
        </p>

        <div className={styles.buttons}>
          <PrimaryButton text="View →" onClick={() => router.push(`/event/${id}`)} />  
        </div>
      </div>
    </div>
  );
}
