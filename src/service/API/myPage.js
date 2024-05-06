import axios from "axios";

const userDeatils = async () => {
    return await axios
        .get(`/user/details`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

export const myPage = {
    userDeatils,
};