'use client';

import { useAuth } from "@/context/AuthContext";
import styles from "@/app/components/PointsBalance.module.css";

export default function PointsBalance() {
    const { user } = useAuth();

    return (
        <div className={styles.balanceCard}>
            <h2>
                 Current Balance:
                <span> {user ? user.points + ' pts': 'Loading...'} </span>
            </h2>
        </div>
    )
    
}
