
import { useNotificationContext } from '../context/NotificationContext';

export const useNotification = () => {
  const { addNotification } = useNotificationContext();
  return addNotification;
};
