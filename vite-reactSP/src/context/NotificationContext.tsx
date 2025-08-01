import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Notification = {
  id: number;
  message: ReactNode;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: ReactNode) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: ReactNode) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotificationContext must be used inside NotificationProvider"
    );
  return context;
};
