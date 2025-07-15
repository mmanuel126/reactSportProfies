// src/components/Notification.tsx
import React from 'react';
import { useNotificationContext } from '../context/NotificationContext';
import './Notification.css';

const Notification: React.FC = () => {
  const { notifications } = useNotificationContext();

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <div key={n.id} className="notification">
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
