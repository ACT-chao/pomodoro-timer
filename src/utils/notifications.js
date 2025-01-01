export const initializeNotifications = async () => {
  if (!("Notification" in window)) {
    return false;
  }
  
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title, options) => {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}; 