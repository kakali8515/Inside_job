import axios from "axios";

const list = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/user/recently-viewed-jobs?${params}`, {
        })
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

export const recentlyViewedAnnouncement = {
    list,
};