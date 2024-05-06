import axios from "axios";

const paidProductLockerList = async () => {
   return await axios
  .get(`/ad/paid-product-locker-list`)
};

const jobList = async (page, limit) => {
  return await axios
 .get(`/job/purchase-recruiter-job-list?page=${page}&limit=${limit}`)
};

const applyFeature = async (id,data) => {
  return await axios
 .put(`/job/apply-paid-feature-save/${id}`, data)
};

export const PaidProductLockerService = {
    paidProductLockerList,
    jobList,
    applyFeature
   
};
