import axios from "axios";

const list = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/notification/notification-list?${params}`)
        .then((res) => res)
        .catch((err) => err);
};

const readNotification = async (status) => {
    return await axios
        .put(`/notification/read/${status}`)
        .then((res) => res)
        .catch((err) => err);
};

const notificationStatus = async (status) => {
    return await axios
        .get(`/notification/notification-status`)
        .then((res) => res)
        .catch((err) => err);
};

const checkApplication = async (data) => {
    return await axios
   .post(`/notification/notification-application-check`, data)
};


export const notification = {
    list,
    readNotification,
    notificationStatus,
    checkApplication,
};