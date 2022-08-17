import { atom } from "recoil";

const getNotificationHistory = () => {
  if (localStorage.getItem("notifications")) {
    let localNotifications = JSON.parse(localStorage.getItem("notifications"));
    console.log({ localNotifications });
    return localNotifications ? localNotifications.data.slice(0, 100) : [];
  }
  return [];
};

export const notificationsState = atom({
  key: "notifications",
  default: getNotificationHistory(),
});
