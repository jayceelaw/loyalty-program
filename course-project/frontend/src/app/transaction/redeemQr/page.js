'use client';
import QRCode from "react-qr-code";
import { BackButton, PrimaryButton } from "@/app/components/Button";
import { useRouter } from "next/navigation";

export default function RedeemQR() {

  const transactionID  = localStorage.getItem("transactionID");
  const router = useRouter();

  return (
    <div className="main-container">
        <QRCode className="qr" value={{transactionID: transactionID, type: 'redemption'}} />
        <h2>Scan QR to process redemption.</h2>
        <h2>Transaction ID: {transactionID}</h2>
        <BackButton className="submit" text="Transactions" onClick={()=> {
          router.push('/transaction');
          }}></BackButton>
        <PrimaryButton className="submit" text="Redeem Again" onClick={()=> {
          router.push('/transaction/redeem');
          }}></PrimaryButton>
    </div>
  );
}

