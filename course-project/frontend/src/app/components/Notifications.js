'use client';

import { useNotification } from "@/context/NotificationContext";
import NotificationCard from "./NotificationCard";
import styles from './Notifications.module.css';
import { useAuth } from "@/context/AuthContext";

export default function Notifications() {
    
    const { user } = useAuth();
    const { notifications, setNotifications, clear } = useNotification();
    return (
        <div className={styles.mainContainer}>
            {notifications.length > 0 ? <button className={styles.clear} onClick={() => {
                clear(user.utorid); // clear backend
                setNotifications([]); // clear frontend
            }}>Clear</button> : <p className={styles.none}>No notifications.</p>}
            {notifications.map((notification, i) => (
                <NotificationCard key={i} notification={notification} setNotifications={setNotifications}/>
            ))}
            
        </div>
    )

}