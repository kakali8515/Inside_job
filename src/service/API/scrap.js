import axios from "axios";

const list = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/scrap/scrap-list?${params}`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

const add = async (data) => {
    return await axios
        .post('/scrap/add/', data)
        .then((res) => res)
        .catch((err) => err);
};

const deleteScrap = async (data) => {
    return await axios
        .delete(`/scrap/delete/`, { data })
        .then((res) => res)
        .catch((err) => err);
};

export const scrap = {
    list,
    deleteScrap,
    add,
};