// src/hooks/useNotification.ts
import { useNotificationContext } from '../context/NotificationContext';

export const useNotification = () => {
  const { addNotification } = useNotificationContext();
  return addNotification;
};
