'use client';
import QRCode from "react-qr-code";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function RedeemQR() {
  const FRONTEND_URL = usePathname() || 'http:localhost:3000';
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  return (
    <div className="main-container">
        <QRCode className="qr" value={FRONTEND_URL + `/transaction/process?transactionId=${transactionId}`} />
        <h2>Scan QR to process redemption.</h2>
        <h2>Transaction ID: {transactionId}</h2>
    </div>
  );
}

