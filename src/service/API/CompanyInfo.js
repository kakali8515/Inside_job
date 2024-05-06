import axios from "axios";

const getCompanyInfo = async (paginate) => {
  return await axios
    .get(`/user/details`, {
      params: paginate,
    })
    .then((res) => res)
    .catch((err) => {
      alert(err)
      return err;
    });
};

const updateCompanyDeatils = async (userData) => {
  return await axios
      .put(`/user/update-company-details`, userData)
      .then((res) => res)
      .catch((err) => err);
};

const updateProfilePic = async (data) => {
  return await axios
 .post(`/user/update-profile-pic`, data)
};



export const CompanyInfo = {
    getCompanyInfo,
    updateCompanyDeatils,
    updateProfilePic
  
};