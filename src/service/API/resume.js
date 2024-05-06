import axios from "axios";

// use for apply choose resume page listing
const list = async () => {
  return await axios
    .get(`/job-application/select-resume-list`, {})
    .then((res) => res)
    .catch((err) => err);
};

const applyForJob = async (userData) => {
  return await axios
    .post(`/job-application/apply`, userData)
    .then((res) => res)
    .catch((err) => err);
};

// resume
const resumeList = async () => {
  return await axios
    .get(`/resume/resume-list`, {})
    .then((res) => res)
    .catch((err) => err);
};

const deleteResume = async (userData) => {
  return await axios
    .delete(`/resume/resume-delete`, { data: userData })
    .then((res) => res)
    .catch((err) => err);
};

const addResume = async (data) => {
  return await axios
    .post(`resume/add-resume`, data)
    .then((res) => res)
    .catch((err) => err);
};

const editResume = async (id, data) => {
  return await axios
    .put(`resume/edit-resume/${id}`, data)
    .then((res) => res)
    .catch((err) => err);
};

//self pr
const selfPrList = async (obj) => {
  var params = new URLSearchParams(obj).toString();
  return await axios
    .get(`/resume/self-pr-list?${params}`, {})
    .then((res) => res)
    .catch((err) => err);
};

const uploadFile = async (userData) => {
  return await axios
    .post(`resume/upload-self-pr`, userData)
    .then((res) => res)
    .catch((err) => err);
};

const deleteSelfPr = async (obj) => {
  var params = new URLSearchParams(obj).toString();
  return await axios
    .delete(`resume/delete-photo-other-doc?${params}`, {})
    .then((res) => res)
    .catch((err) => err);
};

const viewResume = async (id) => {
  // var params = new URLSearchParams(obj).toString();
  return await axios
    .get(`resume/resume-details/${id}`)
    .then((res) => res)
    .catch((err) => err);
};

export const resume = {
  list,
  applyForJob,
  resumeList,
  deleteResume,
  selfPrList,
  uploadFile,
  deleteSelfPr,
  viewResume,
  addResume,
  editResume,
};
