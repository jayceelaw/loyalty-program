"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import TransactionCard from "../../components/TransactionCard";
import styles from "./regular.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const backendURL = "http://localhost:4000";

export default function RegularUserPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`${backendURL}/users/me/transactions?limit=5`, { // Display recent transactions, assume 5 for now
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data.results));
  }, [user]);

  if (!user) return <p>Loading...</p>;

  const chartData = transactions
    .slice()
    .reverse() // oldest transaction first
    .map((t, index) => ({
      name: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : `T${index + 1}`,
      points: t.amount,
    }));

  return (
    <main className={styles.container}>
      <h2 className={styles.welcome}>Welcome, {user.name}</h2>
      <h3 className={styles.points}>Current Points: {user.points}</h3>

      <div className={styles.dashboard}>
        {/* Transaction List */}
        <div className={styles.transactionsSection}>
          <h4 className={styles.recentTransactions}>Recent Transactions</h4>
          <div className={styles.transactions}>
            {transactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              transactions.map((t, index) => (
                <TransactionCard key={index} {...t} showAll={false} />
              ))
            )}
          </div>
        </div>

        {/* Line Chart */}
        <div className={styles.chartSection}>
          <h4>Recent Point Changes</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="linear"
                dataKey="points"
                stroke="#000000"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
