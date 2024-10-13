import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [lastNotification, setLastNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [ready, setReady] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!ready){
            websocketConnect();           
        }
        console.log(ready);

    }, [ready]);


    const websocketConnect = () =>{
        const token = localStorage.getItem('auth_token');
        const socket = new WebSocket(`ws://localhost:8000/notifications/?token=${token}`);

        socket.onopen = () => setReady(true);

        socket.onmessage = function(e) {
            try {
                const data = JSON.parse(e.data);
                setNotifications(prev => [...prev, data.message]);
                console.log(data)
                setLastNotification(data.message);
                setIsVisible(true);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        socket.onerror = function(e) {
            console.error('Ошибка:', e);
        };

        socket.onclose = () => setReady(false);

        return () => {

            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
                console.log("sleep")
            }

        };
    }

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div>
            <button onClick={toggleMenu}>
                {isOpen ? 'Закрыть уведомления' : 'Показать уведомления'}
            </button>
            {isOpen && (
                <div className="notification-menu">
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index}>{notification}</li>
                        ))}
                    </ul>
                </div>
            )}
            {isVisible && (
                <div className="notification-sidebar">
                    <p>{lastNotification}</p>
                    <button onClick={handleClose}>Закрыть</button>
                </div>
            )}
        </div>
    );
};

export default Notifications;

