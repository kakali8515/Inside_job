import axios from "axios";

const publishList = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/job/recruiter-job-list?${params}`, {
        })
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const cancelList = async (obj) => {
    var params = new URLSearchParams(obj).toString();
    return await axios
        .get(`/job/recruiter-job-cancel-list?${params}`, {
        })
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const paidProductStorageList = async (id) => {
    return await axios
        .get(`/job/apply-paid-feature-list/${id}`)
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const withdrawList = async (id) => {
    return await axios
        .get(`/job/withdraw-purchase-list/${id}`)
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const applyPaidFeature = async (id, userData) => {
    return await axios
        .put(`job/apply-paid-feature-save/${id}`, userData)
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const withdraw = async (id, userData) => {
    console.log(userData)
    return await axios
        .delete(`/job/withdraw-paid-purchase-delete/${id}`, {data: userData})
        .then((res) => res)
        .catch((err) => {
            errCheck(err);
        });
};

const automaticJobPostList = async (page, limit) => {
    return await axios
   .get(`/otherplatfrom/list?page=${page}&limit=${limit}`)
};
  
const automatiocApplyJob = async (data) => {
    return await axios
   .post(`/otherplatfrom/apply/`, data)
};

  

export const jobListing = {
    publishList,
    cancelList,
    paidProductStorageList,
    withdrawList,
    applyPaidFeature,
    withdraw,
    automatiocApplyJob,
    automaticJobPostList,

};