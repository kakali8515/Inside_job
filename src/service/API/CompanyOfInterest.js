import axios from "axios";

const getInterestedList = async (paginate) => {
  return await axios
    .get(`/interested-company/companay-list`, {
      params: paginate,
    })
    .then((res) => res)
    .catch((err) => err);
};

const deletedCompany = async (data) => {
  return await axios
    .put(`/interested-company/delete/`, data)
    .then((res) => res)
    .catch((err) => err);
};

const getDetailList = async (id, page, limit) => {
  return await axios
    .get(`/interested-company/company-details/${id}/${page}/${limit}`)
    .then((res) => res)
    .catch((err) => err);
};

const addFavourites = async (data) => {
  return await axios
    .post(`/interested-company/add`, data)
    .then((res) => res)
    .catch((err) => err);
};

export const CompanyOfInterestService = {
  getInterestedList,
  deletedCompany,
  getDetailList,
  addFavourites,
};
