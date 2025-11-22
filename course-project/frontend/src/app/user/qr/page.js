'use client';
import QRCode from "react-qr-code";
import { useAuth } from "@/context/AuthContext";

export default function UserQR({userID}) {
    const { user } = useAuth();

    return (
        <div className="main-container">
            <QRCode className="qr" value={{userID: userID, type: 'user'}} />
            <h2>{`utorid:  ${user ? `${user.utorid}` : "Loading..."}`} <br/>
                {`Scan QR to initiate a transaction.`}</h2>
        </div>
    );
}

