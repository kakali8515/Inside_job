import axios from "axios";

const recruiterApplicantUnreadList = async (page, limit) => {
   return await axios
  .get(`/job-application/recruiter-application-list/?page=${page}&limit=${limit}`)
};

const recruiterApplicantUnreadListByJob = async (page, limit, id) => {
  return await axios
 .get(`/job-application/recruiter-application-list/?page=${page}&limit=${limit}&job_id=${id}`)
};

const recruiterApplicantReadList = async (page, limit) => {
    return await axios
   .get(`/job-application/recruiter-application-read-list/?page=${page}&limit=${limit}`)
 };

 const recruiterApplicantReadListByJob = async (page, limit, id) => {
  return await axios
 .get(`/job-application/recruiter-application-read-list/?page=${page}&limit=${limit}&job_id=${id}`)
};

const addTowatchList = async (id) => {
     return await axios
    .put(`/job-application/add-to-bookmark-application/${id}`)
};

const removeFromwatchList = async (id) => {
  return await axios
 .put(`/job-application/remove-from-bookmark-application/${id}`)
};

const readApplication = async (id) => {
  return await axios
 .put(`/job-application/read-application-job/${id}`)
};

const recruiterApplicantBookmarkedList = async (page, limit) => {
  return await axios
 .get(`/job-application/recruiter-application-bookmark-list/?page=${page}&limit=${limit}`)
};

const recruiterApplicantBookmarkedListtByJob = async (page, limit, id) => {
  return await axios
 .get(`/job-application/recruiter-application-bookmark-list/?page=${page}&limit=${limit}&job_id=${id}`)
};




export const CandidateConfirmationService = {
    recruiterApplicantUnreadList,
    recruiterApplicantReadList,
    recruiterApplicantReadListByJob,
    recruiterApplicantUnreadListByJob,
    addTowatchList,
    removeFromwatchList,
    readApplication,
    recruiterApplicantBookmarkedList,
    recruiterApplicantBookmarkedListtByJob,
   
};
