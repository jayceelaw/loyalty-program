"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PrimaryButton } from "../../components/Button";
import styles from "./cashier.module.css";

export default function CashierDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;

  return (
    <main className={styles.container}>
      <h2 className={styles.welcome}>Welcome, {user.name}!</h2>
      <div className={styles.buttons}>
        <PrimaryButton text="Create Transaction" onClick={() => router.push("/transaction/purchase")} />  {/* Not sure if this is the right page for create transactions*/}
        <PrimaryButton text="Process Redemption" onClick={() => router.push("/transaction/process")} />
      </div>
    </main>
  );
}
