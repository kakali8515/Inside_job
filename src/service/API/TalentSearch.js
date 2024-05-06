import axios from "axios";

const talentSearchlist = async (userData) => {
    // var params = new URLSearchParams(obj).toString();
    return await axios
        .post(`talent/talent-list`, userData)
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const talentSearchHistory = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/talent/talent-history-list?${params}`)
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const viewTalentSearch = async (userData) => {
    return await axios
        .post(`/talent/talent-search-view`,userData)
        .then((res) => res)
        .catch((err) => err);
};

//annoucement list
const annoucementList = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/job/recruiter-job-published-list?${params}`)
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

//offer position to seeker
const offerPosition = async (userData) => {
    return await axios
        .post(`talent/position-offered`, userData)
        .then((res) => res)
        .catch((err) => err);
};

export const TalentSearch = {
    talentSearchlist,
    talentSearchHistory,
    viewTalentSearch,
    annoucementList,
    offerPosition
};