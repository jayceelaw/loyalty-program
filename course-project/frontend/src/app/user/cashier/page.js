"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PrimaryButton } from "../../components/Button";
import styles from '../user.module.css';

const showAdvancedFeatures = true; // Toggle to false if no features added 

export default function CashierDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;

  const cardClassName = showAdvancedFeatures ? `${styles.resultsCard} ${styles.modifiedCashierResultsCard}` : `${styles.resultsCard} ${styles.fullHeightCashierResultsCard}`;

  return (
    <div className={styles.pageContainer}> 
      <main className={cardClassName}>
        <h2 className={styles.welcome}>Welcome, {user.name}!</h2> 
        <div className={showAdvancedFeatures ? styles.buttons : styles.largeButtons}>
          <PrimaryButton text="Create Transaction" onClick={() => router.push("/transaction/purchase")} />  {/*page for create transactions*/}
          <PrimaryButton text="Process Redemption" onClick={() => router.push("/transaction/process")} />
        </div>
        {showAdvancedFeatures && (<div className={styles.cashierDataSection}><p>TODO: Space reserved for advanced features; if anyone wants to add data visualization stuff, go for it :D</p>
        </div>
        )}
      </main>
    </div>
  );
}
