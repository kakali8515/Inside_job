import axios from "axios";

const userRecruiterDeatils = async () => {
    return await axios
        .get(`/user/details`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

export const recruitermypage = {
    userRecruiterDeatils,
};
