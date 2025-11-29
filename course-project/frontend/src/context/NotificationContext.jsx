'use client';
import { useState, useEffect, createContext, useContext, useRef} from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);
export const useNotification = () => useContext(NotificationContext);


export function NotificationProvider({children}) {

    const { user } = useAuth();
    const [ notifications, setNotifications ] = useState([]);
    const [ unseen, setUnseen ] = useState(0); // new unseen notifications
    const socketRef = useRef(null);

    // connect to server
    useEffect(() => {

        // ensure socket only connects once, when user is defined
        if (!user) return; 

        const socket = new WebSocket(`ws://localhost:4000/?utorid=${user.utorid}`);
        socketRef.current = socket;
        
        socket.onopen = () => {
            setNotifications([]); // clear existing notifications (possibly from previous user)
            setUnseen(0);
        };

        // listen for real-time notifications
        socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            if (!notification.seen) setUnseen(prev => prev + 1);
            setNotifications(prev => [notification, ...prev]);
        };

        // close
        // socket.onclose = () => {
        //     console.log("WebSocket disconnected");
        // };

        // error
        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };


        // disconnect when unmounting
        return () => {
            socket.close();
        };

    }, [user]);

    const notify = (utorid, message) => {
        socketRef.current.send(JSON.stringify({utorid, message}));
    }

    const clear = () => {
        socketRef.current.send(JSON.stringify({utorid: user.utorid, clear: true}));
        setUnseen(0);
    }

    const view = (id) => {
        socketRef.current.send(JSON.stringify({id: id, view: true}));
    }

    return (
        <NotificationContext.Provider value={{
            notify,
            clear,
            view,
            notifications,
            setNotifications,
            unseen,
            setUnseen
        }}>
            {children}
        </NotificationContext.Provider>
    )

}
