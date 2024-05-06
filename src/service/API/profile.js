import axios from "axios";

const userDeatils = async () => {
    return await axios
        .get(`/user/details`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

const updateUserDeatils = async (userData) => {
    return await axios
        .put(`/user/update-user-details`, userData)
        .then((res) => res)
        .catch((err) => err);
};

const deleteProfilePic = async () => {
    return await axios.delete("/user/delete-profile-pic")
}

export const profile = {
    userDeatils,
    updateUserDeatils,
    deleteProfilePic
};