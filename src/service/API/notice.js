import axios from "axios";

const list = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/notice/noticeList?${params}`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

const view = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/notice/noticeDetails?${params}`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

export const notice = {
    list,
    view,
};