import { useNotification } from "@/context/NotificationContext";
import styles from "./Notifications.module.css";

export default function NotificationCard({ notification }) {
    const { setNotifications, setUnseen, view } = useNotification();
    return (
        <div className={styles.messageContainer + ' ' + (notification.seen ? '' : styles.unseen)}
            onMouseEnter={()=>{
                if (notification.seen) return;
                view(notification.id); // mark as seen in backend db
                setNotifications(prevNotifications => 
                    prevNotifications.map(n =>
                        n.id === notification.id ? { ...n, seen: true } : n
                    )
                );
                setUnseen(prev => prev - 1);
            }}>
            <div className={styles.content}>
                 <div className={styles.title}>{new Date(notification.time).toLocaleString()}</div>
                 <div className={styles.text}>{notification.message}</div>
            </div>
        </div>
    )
}