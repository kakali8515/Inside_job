import axios from "axios";

const bannerList = async () => {
  return await axios.get(`/banner/list`);
};

const jobListEmergency = async (data) => {
  return await axios.post(`/home/job-list-emergency`, data);
};

const jobListPremium = async (data) => {
  return await axios.post(`/home/job-list-premium`, data);
};

const jobListSpecial = async (data) => {
  return await axios.post(`/home/job-list-special`, data);
};

const jobListLineFree = async (data) => {
  return await axios.post(`/home/job-list-line-free`, data);
};

const addScrap = async (data) => {
  return await axios.post("/scrap/add/", data);
};

const deleteScrap = async (data) => {
  //console.log(data)
  return await axios.delete("/scrap/delete/", { data });
};

const region1stLevel = async () => {
  return await axios.get(`/master-data/region-1st-level`);
};
const checkUserStatus = async () => {
  return await axios.get(`user/check-token`, localStorage.getItem("token"));
};
const region2ndLevel = async (id) => {
  return await axios.get(`/master-data/region-2nd-level/${id}`);
};

const profileDetails = async () => {
  return await axios.get(`/user/details`);
};

const lockerDetails = async () => {
  return await axios.get(`/user/locker-details`);
};

const jobDetails = async (id) => {
  return await axios.get(`/job/details/${id}`);
};

const deleteJob = async (id) => {
  return await axios.delete(`/job/delete-job/${id}`);
};

const closeJob = async (id) => {
  return await axios.delete(`/job/close-job/${id}`);
};

const addFavourites = async (data) => {
  return await axios.post(`/interested-company/add`, data);
};

const deletedCompany = async (data) => {
  return await axios.put(`/interested-company/delete/`, data);
};

export const HomeService = {
  bannerList,
  jobListEmergency,
  jobListPremium,
  jobListSpecial,
  jobListLineFree,
  addScrap,
  region1stLevel,
  region2ndLevel,
  profileDetails,
  lockerDetails,
  jobDetails,
  deleteJob,
  closeJob,
  deleteScrap,
  addFavourites,
  deletedCompany,
  checkUserStatus,
};
