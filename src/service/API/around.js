import axios from "axios";

const aroundList = async (userData) => {
    return axios
        .post("/job/around-list", userData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export const around = {
    aroundList
};