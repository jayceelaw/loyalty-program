import { useNotification } from "@/context/NotificationContext";
import colors from "../constants/colors";
import Symbol from "./Symbol";
import styles from "./Notifications.module.css";

export default function NotificationButton({ toggle }) {

    const { unseen, view } = useNotification();
    return (
        <>
            {unseen > 0 && <div className={styles.unseenCount}>{unseen}</div>}
            <div className={styles.button} onClick={() => {
                toggle();
                // view(); if user doesn't want to hover over all notifications
            }}>
                <Symbol
                name="Notification"
                size={24}
                colour={colors.black}
                />
            </div>
        </>
    )
}