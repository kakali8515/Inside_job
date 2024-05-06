import axios from "axios";

// logged in as a employee
const companyListForRating = async (page, limit) => {
  return await axios
  .get(`/resignation/seeker-ratinglist?page=${page}&limit=${limit}`)
  .then((res) => res)
  .catch((err) => err);
};

const employerRatingDetails = async (id) => {
  return await axios
  .get(`/resignation/employer-rating-details/${id}`)
  .then((res) => res)
  .catch((err) => err);
};

// logged in as a recruiter
const employeeListForRating = async (page, limit) => {
  return await axios
  .get(`/resignation/employer-ratinglist?page=${page}&limit=${limit}`)
  .then((res) => res)
  .catch((err) => err);
};

const employeeRatingDetails = async (id) => {
  return await axios
  .get(`/resignation/seeker-rating-details/${id}`)
  .then((res) => res)
  .catch((err) => err);
};

const setSeekerRating = async (data) => {
  return await axios
    .post(`/resignation/save-rating-employer/`, data)
    .then((res) => res)
    .catch((err) => err);
}

export const StarManagementService = {
    companyListForRating,
    employerRatingDetails,
    employeeRatingDetails,
    employeeListForRating,
    setSeekerRating
};
