import axios from "axios";

const list = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/job-application/seeker-application-list?${params}`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

const cancelList = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/job-application/seeker-application-cancel-list?${params}`, {
        })
        .then((res) => res)
        .catch((err) => err);
};

const cancelApplication = async (job_id,userData) => {
    return await axios
        .put(`/job-application/seeker-cancel-application-job/${job_id}`, userData)
        .then((res) => res)
        .catch((err) => err);
};

export const ApplicationStatus = {
    list,
    cancelList,
    cancelApplication
};