"use client";
import { useAuth } from "@/context/AuthContext";
import RegularUserPage from "./regular/page";
import CashierDashboardPage from "./cashier/page";
import ManagerDashboardPage from "./manager/page";

export default function UserDashboardPage() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  if (user.role === "regular") return <RegularUserPage />;
  if (user.role === "cashier") return <CashierDashboardPage />;
  if (user.role === "manager" || user.role === "superuser") return <ManagerDashboardPage />;

  return <p>Unknown role</p>;
}
