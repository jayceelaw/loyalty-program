'use client';

import { useNotification } from "@/context/NotificationContext";
import NotificationCard from "./NotificationCard";
import styles from './Notifications.module.css';
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Notifications() {
    
    const { user } = useAuth();
    const { notifications, setNotifications, clear, retrieve, end } = useNotification();
    const [ loading, setLoading ] = useState(false);

    const loadData = () => {
        setLoading(true);
        retrieve();
        setLoading(false);
    }

    const handleScroll = (e) => {
        const bottomReached = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10;
        if (bottomReached && !loading && !end) { 
            loadData();
        }
    }

    return (
        <div className={styles.mainContainer} onScroll={handleScroll}>
            {notifications.length > 0 ? <button className={styles.clear} onClick={() => {
                clear(user.utorid); // clear backend
                setNotifications([]); // clear frontend
            }}>Clear</button> : ''}
            {notifications.map((notification, i) => (
                <NotificationCard key={i} notification={notification} setNotifications={setNotifications}/>
            ))}
            <p className={styles.none}>No older notifications.</p>
            
        </div>
    )

}