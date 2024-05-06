import axios from "axios";

// use for apply choose resume page listing
const list = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/job-application/job-hunting-list?${params}`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

const sendEmail = async (userData) => {
    return await axios
        .post(`/job-application/email-send`, userData)
        .then((res) => res)
        .catch((err) => err);
};

const downloadPdf = async (userData) => {
    return await axios
        .post(`/job-application/issue-hunting-certifiactes`, userData)
        .then((res) => res)
        .catch((err) => err);
};

const userDetails = async () => {
    return await axios
        .get(`/user/details`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

export const JobHuntingCertificate = {
    list,
    sendEmail,
    userDetails,
    downloadPdf
};