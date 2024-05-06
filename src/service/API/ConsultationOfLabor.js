import axios from "axios";

const consultationList = async (page, limit) => {
  return await axios
  .get(`/consultation/consultation-list?page=${page}&limit=${limit}`)
  .then((res) => res)
  .catch((err) => err);
};

// const employerRatingDetails = async (id) => {
//   return await axios
//   .get(`/resignation/employer-rating-details/${id}`)
//   .then((res) => res)
//   .catch((err) => err);
// };

const consultationDetails = async (id, password = '') => {
  return await axios
  .get(`/consultation/view/${id}?password=${password}`)
};

const addConsultation = async (data) => {
  return await axios
    .post(`/consultation/add`, data);
}

const deleteConsultation = async (id) => {
  return axios
    .delete(`/consultation/delete/${id}`);
};

const editConsultation = async (id, data) => {
  return axios
    .put(`/consultation/edit/${id}`, data);
};


export const ConsultationOfLaborService = {
    consultationList,
    consultationDetails,
    addConsultation,
    deleteConsultation,
    editConsultation
};
