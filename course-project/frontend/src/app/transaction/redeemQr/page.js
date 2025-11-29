'use client';
import QRCode from "react-qr-code";
import { BackButton, PrimaryButton } from "@/app/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '@/app/transaction/transaction.module.css';
const FRONTEND_URL = 'http:localhost:3000';

export default function RedeemQR() {

  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const router = useRouter();

  return (
    <div className="main-container">
        <QRCode className="qr" value={FRONTEND_URL + `/transaction/process?transactionId=${transactionId}`} />
        <h2>Scan QR to process redemption.</h2>
        <h2>Transaction ID: {transactionId}</h2>
    </div>
  );
}

